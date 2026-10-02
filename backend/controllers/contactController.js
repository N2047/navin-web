const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const sendMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message, attachmentUrl, honeypot } = req.body;

    // Honeypot anti-spam check
    if (honeypot) {
      return res.status(200).json({ success: true, message: 'Message sent successfully.' });
    }

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';

    const newMsg = await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : null,
        subject: subject ? subject.trim() : 'General Inquiry',
        message: message.trim(),
        attachmentUrl: attachmentUrl || null,
        ipAddress: clientIp.substring(0, 45)
      }
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received successfully. I will get back to you soon.',
      id: newMsg.id
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send message.', error: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const where = {};
    if (status === 'unread') where.isRead = false;
    else if (status === 'read') where.isRead = true;
    else if (status === 'replied') where.isReplied = true;

    const [total, unreadCount, messages] = await Promise.all([
      prisma.contactMessage.count({ where }),
      prisma.contactMessage.count({ where: { isRead: false } }),
      prisma.contactMessage.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum
      })
    ]);

    res.json({
      success: true,
      total,
      unreadCount,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      messages
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve messages.', error: error.message });
  }
};

const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { isRead, isReplied, replyNotes } = req.body;

    const updated = await prisma.contactMessage.update({
      where: { id },
      data: {
        ...(isRead !== undefined && { isRead: Boolean(isRead) }),
        ...(isReplied !== undefined && { isReplied: Boolean(isReplied) }),
        ...(replyNotes !== undefined && { replyNotes })
      }
    });

    res.json({ success: true, message: 'Message updated.', messageItem: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update message.', error: error.message });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.contactMessage.delete({ where: { id } });
    res.json({ success: true, message: 'Message deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete message.', error: error.message });
  }
};

module.exports = {
  sendMessage,
  getMessages,
  updateMessage,
  deleteMessage
};
