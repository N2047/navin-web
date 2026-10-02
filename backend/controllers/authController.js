const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier can be email or username
    if (!identifier || !password) {
      return res.status(400).json({ success: false, message: 'Email/Username and password are required.' });
    }

    const admin = await prisma.admin.findFirst({
      where: {
        OR: [
          { email: identifier.toLowerCase().trim() },
          { username: identifier.trim() }
        ]
      }
    });

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful.',
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        username: admin.username,
        name: admin.name,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error during login.', error: error.message });
  }
};

const me = async (req, res) => {
  res.json({
    success: true,
    admin: req.admin
  });
};

const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Both current and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters.' });
    }

    const admin = await prisma.admin.findUnique({ where: { id: req.admin.id } });
    const isMatch = await bcrypt.compare(currentPassword, admin.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    await prisma.admin.update({
      where: { id: req.admin.id },
      data: { passwordHash }
    });

    res.json({ success: true, message: 'Password updated successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update password.', error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email, username } = req.body;
    const updated = await prisma.admin.update({
      where: { id: req.admin.id },
      data: {
        ...(name && { name }),
        ...(email && { email: email.toLowerCase().trim() }),
        ...(username && { username: username.trim() })
      },
      select: { id: true, email: true, username: true, name: true, role: true }
    });

    res.json({ success: true, message: 'Admin profile updated.', admin: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update admin profile.', error: error.message });
  }
};

module.exports = { login, me, updatePassword, updateProfile };
