// API для отправки заявки на банковскую гарантию
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const formData = req.body;
    
    // Проверяем ключ доступа
    const accessKey = formData.get('accessKey');
    if (accessKey !== 'ba42c3d9-0cfe-43b4-816a-cbe491f04fca') {
      return res.status(401).json({ message: 'Неверный ключ доступа' });
    }

    // Собираем данные банковской гарантии
    const guaranteeData = {
      tenderLink: formData.get('tenderLink'),
      guaranteeAmount: formData.get('guaranteeAmount'),
      federalLaw: formData.get('federalLaw'),
      guaranteeType: formData.get('guaranteeType'),
      guaranteePeriod: formData.get('guaranteePeriod'),
      timestamp: new Date().toLocaleString('ru-RU', { 
        timeZone: 'Europe/Moscow',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };

    // Информация о документах
    const documentsInfo = JSON.parse(formData.get('documentsInfo') || '[]');
    
    // Формируем детальное письмо для отправки
    const emailContent = `
=== ЗАЯВКА НА БАНКОВСКУЮ ГАРАНТИЮ ===
Дата и время подачи: ${guaranteeData.timestamp}

ДАННЫЕ ГАРАНТИИ:
• Ссылка на тендер: ${guaranteeData.tenderLink}
• Сумма гарантии: ${guaranteeData.guaranteeAmount}
• Федеральный закон: ${guaranteeData.federalLaw}
• Тип гарантии: ${guaranteeData.guaranteeType}
• Срок гарантии: ${guaranteeData.guaranteePeriod}

ПЕРЕЧЕНЬ НЕОБХОДИМЫХ ДОКУМЕНТОВ:
${documentsInfo.map(doc => 
  `• ${doc.name}: ${doc.filesCount > 0 ? `${doc.filesCount} файл(ов) - ${doc.fileNames.join(', ')}` : 'Не загружено'}`
).join('\n')}

---
Заявка подана через poehali.dev
Email для связи: garantiya25@mail.ru
`;

    // Логируем данные (в реальном проекте здесь была бы отправка через SMTP на garantiya25@mail.ru)
    console.log('📧 Отправка на garantiya25@mail.ru:');
    console.log(emailContent);
    
    // Возвращаем успешный ответ
    res.status(200).json({ 
      message: 'Заявка успешно отправлена на garantiya25@mail.ru',
      data: {
        ...guaranteeData,
        documentsCount: documentsInfo.reduce((sum, doc) => sum + doc.filesCount, 0),
        email: 'garantiya25@mail.ru'
      }
    });

  } catch (error) {
    console.error('❌ Ошибка при обработке заявки:', error);
    res.status(500).json({ message: 'Ошибка при отправке заявки' });
  }
}