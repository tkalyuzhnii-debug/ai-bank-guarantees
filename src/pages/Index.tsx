import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [moscowTime, setMoscowTime] = useState(new Date());
  const [vladTime, setVladTime] = useState(new Date());
  const [currencyRates] = useState({
    usd: 89.45,
    eur: 95.67,
    cny: 12.34,
    gold: 5890.50,
    platinum: 2845.30
  });
  
  const [bankRates] = useState([
    { bank: 'Сбербанк', rate: '1.5%' },
    { bank: 'ВТБ', rate: '1.7%' },
    { bank: 'Газпромбанк', rate: '1.8%' },
    { bank: 'Альфа-Банк', rate: '2.0%' },
    { bank: 'Россельхозбанк', rate: '1.9%' },
    { bank: 'Открытие', rate: '2.1%' },
    { bank: 'Промсвязьбанк', rate: '2.2%' },
    { bank: 'МКБ', rate: '2.0%' },
    { bank: 'Росбанк', rate: '1.8%' },
    { bank: 'Райффайзенбанк', rate: '1.6%' }
  ]);
  
  const [allBankRates] = useState([
    { bank: 'Сбербанк', rate: '1.5%' },
    { bank: 'ВТБ', rate: '1.7%' },
    { bank: 'Газпромбанк', rate: '1.8%' },
    { bank: 'Альфа-Банк', rate: '2.0%' },
    { bank: 'Россельхозбанк', rate: '1.9%' },
    { bank: 'Открытие', rate: '2.1%' },
    { bank: 'Промсвязьбанк', rate: '2.2%' },
    { bank: 'МКБ', rate: '2.0%' },
    { bank: 'Росбанк', rate: '1.8%' },
    { bank: 'Райффайзенбанк', rate: '1.6%' },
    { bank: 'Тинькофф Банк', rate: '1.9%' },
    { bank: 'УБРиР', rate: '2.3%' },
    { bank: 'АК БАРС', rate: '2.1%' },
    { bank: 'Банк Зенит', rate: '2.4%' },
    { bank: 'Совкомбанк', rate: '2.0%' },
    { bank: 'Ситибанк', rate: '1.8%' },
    { bank: 'Банк Санкт-Петербург', rate: '2.2%' },
    { bank: 'Транскапиталбанк', rate: '2.5%' },
    { bank: 'Росгосстрах Банк', rate: '2.3%' },
    { bank: 'Банк Уралсиб', rate: '2.4%' }
  ]);
  
  const [selectedGuaranteeType, setSelectedGuaranteeType] = useState('');
  const [federalLaw, setFederalLaw] = useState('');
  const [tenderLink, setTenderLink] = useState('');
  const [guaranteeAmount, setGuaranteeAmount] = useState('');
  const [guaranteePeriod, setGuaranteePeriod] = useState('');
  const [accessKey, setAccessKey] = useState('ba42c3d9-0cfe-43b4-816a-cbe491f04fca');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const requiredDocuments = [
    { id: 'tender', name: 'Реестровый № торгов/ссылка на закупку' },
    { id: 'balance2024', name: 'Бух. Бал. по Ф1 и Ф2 за 2024г.' },
    { id: 'balance2025', name: 'Бух. Бал. по Ф1 и Ф2 за 2 кв. 2025г.' },
    { id: 'lease', name: 'Договор аренды/собственности помещения' },
    { id: 'passports', name: 'Паспорта руководителей и учредителей' },
    { id: 'requisites', name: 'Карточка с реквизитами организации' },
    { id: 'charter', name: 'Устав' },
    { id: 'director', name: 'Приказ + решение о назначении ген. директора' }
  ];

  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: File[]}>({});
  
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setMoscowTime(new Date(now.toLocaleString("en-US", {timeZone: "Europe/Moscow"})));
      setVladTime(new Date(now.toLocaleString("en-US", {timeZone: "Asia/Vladivostok"})));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const guaranteeTypes = [
    {
      value: 'commercial',
      label: 'Коммерческая гарантия',
      range: '1 000 - 1 000 000 ₽',
      description: 'For small commercial deals',
    },
    {
      value: 'express',
      label: 'Экспресс-гарантии',
      range: '1 000 - 5 000 000 ₽',
      description: 'Fast processing within 1-2 days',
    },
    {
      value: 'standard',
      label: 'Стандартные гарантии',
      range: '5 000 000 - 100 000 000 ₽',
      description: 'Optimal conditions for most deals',
    },
    {
      value: 'large',
      label: 'Крупные гарантии',
      range: 'от 100 000 000 ₽',
      description: 'For large-scale projects and government contracts',
    }
  ];

  const handleFileUpload = (docId: string, files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      setUploadedFiles(prev => ({
        ...prev,
        [docId]: [...(prev[docId] || []), ...newFiles]
      }));
    }
  };

  const handleSubmit = async () => {
    // Проверка ключа доступа
    if (accessKey !== 'ba42c3d9-0cfe-43b4-816a-cbe491f04fca') {
      alert('❌ Неверный ключ доступа');
      return;
    }

    // Проверка заполненности полей
    if (!tenderLink || !guaranteeAmount || !selectedGuaranteeType) {
      alert('❌ Пожалуйста, заполните все обязательные поля');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Собираем данные банковской гарантии
      const guaranteeData = {
        tenderLink,
        guaranteeAmount,
        federalLaw,
        guaranteeType: selectedGuaranteeType,
        guaranteePeriod,
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
      const documentsInfo = requiredDocuments.map(doc => {
        const files = uploadedFiles[doc.id] || [];
        return {
          name: doc.name,
          filesCount: files.length,
          fileNames: files.map(f => f.name)
        };
      });
      
      // Формируем текст заявки
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

      // Создаем mailto ссылку для отправки
      const subject = encodeURIComponent('Заявка на банковскую гарантию');
      const body = encodeURIComponent(emailContent);
      const mailtoLink = `mailto:garantiya25@mail.ru?subject=${subject}&body=${body}`;
      
      // Открываем почтовый клиент
      window.location.href = mailtoLink;
      
      // Показываем успешное сообщение
      setTimeout(() => {
        alert('✅ Заявка подготовлена для отправки!\n\nОткрылся ваш почтовый клиент для отправки на garantiya25@mail.ru\n\nВ заявке содержатся:\n• Данные банковской гарантии\n• Информация о загруженных документах\n• Контактная информация');
        
        // Очищаем форму после подготовки к отправке
        setTenderLink('');
        setGuaranteeAmount('');
        setFederalLaw('');
        setSelectedGuaranteeType('');
        setGuaranteePeriod('');
        setAccessKey('');
        setUploadedFiles({});
      }, 1000);
      
    } catch (error) {
      console.error('Ошибка подготовки заявки:', error);
      alert('❌ Ошибка при подготовке заявки. Попробуйте снова.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-bank-light to-white">
      {/* Currency Ticker */}
      <div className="bg-bank-navy text-white py-2.5 border-b border-bank-silver">
        <div className="animate-marquee whitespace-nowrap flex space-x-12 text-sm font-medium">
          <span className="flex items-center gap-2">
            <Icon name="DollarSign" size={14} />
            USD: {currencyRates.usd} ₽
          </span>
          <span className="flex items-center gap-2">
            <Icon name="Euro" size={14} />
            EUR: {currencyRates.eur} ₽
          </span>
          <span className="flex items-center gap-2">
            <Icon name="Yen" size={14} />
            CNY: {currencyRates.cny} ₽
          </span>
          <span className="flex items-center gap-2">
            <Icon name="Star" size={14} />
            Золото: {currencyRates.gold} ₽/унц
          </span>
          <span className="flex items-center gap-2">
            <Icon name="Gem" size={14} />
            Платина: {currencyRates.platinum} ₽/унц
          </span>
          {bankRates.map((bank, idx) => (
            <span key={idx} className="flex items-center gap-2">
              <Icon name="Building2" size={14} />
              {bank.bank}: от {bank.rate}
            </span>
          ))}
        </div>
      </div>
      
      {/* Bank Rates Ticker - Reverse Direction */}
      <div className="bg-gradient-to-r from-bank-blue to-bank-navy text-white py-2.5 border-b border-bank-silver">
        <div className="animate-marquee-reverse whitespace-nowrap flex space-x-12 text-sm font-medium">
          {allBankRates.map((bank, idx) => (
            <span key={idx} className="flex items-center gap-2">
              <Icon name="TrendingDown" size={14} />
              {bank.bank}: от {bank.rate}
            </span>
          ))}
          {allBankRates.map((bank, idx) => (
            <span key={`repeat-${idx}`} className="flex items-center gap-2">
              <Icon name="TrendingDown" size={14} />
              {bank.bank}: от {bank.rate}
            </span>
          ))}
        </div>
      </div>
      
      {/* Header */}
      <header className="bg-white shadow-md border-b-2 border-bank-silver">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-bank-navy rounded-lg">
                <Icon name="Building2" size={36} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent tracking-tight">
                  Банковские Гарантии РУ
                </h1>
                <p className="text-gray-400 font-medium">Партнеры ведущих российских банков</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="bg-bank-light p-4 rounded-lg border border-bank-silver">
                <div className="text-sm space-y-2">
                  <div className="flex items-center gap-3">
                    <Icon name="Clock" size={16} className="text-bank-navy" />
                    <span className="text-bank-navy font-medium font-mono bg-black text-green-400 px-2 py-1 rounded border">
                      МОСКВА: {moscowTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Clock" size={16} className="text-bank-slate" />
                    <span className="text-bank-slate font-medium font-mono bg-black text-green-400 px-2 py-1 rounded border">
                      ВЛАДИВОСТОК: {vladTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
              <Badge variant="outline" className="text-bank-green border-bank-green px-4 py-2 text-sm font-semibold">
                <Icon name="Circle" size={8} className="text-bank-green mr-2" />
                Онлайн 24/7
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Info Banner */}
        <div className="max-w-6xl mx-auto mb-16">
          <Card className="bg-gradient-to-r from-bank-navy to-bank-blue text-white shadow-2xl border-0">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Icon name="Award" size={32} className="text-white" />
                  <h2 className="text-2xl font-bold text-green-400">
                    Мы официальные партнеры многих банков России!
                  </h2>
                </div>
                
                <div className="max-w-4xl mx-auto space-y-4 text-lg leading-relaxed">
                  <p>
                    Сайт создан в целях автоматизации выпуска банковской гарантии, для того чтобы уйти от телефонных переговоров, а сразу же приступить к оформлению банковской гарантии.
                  </p>
                  <p>
                    Для этого вам нужно лишь один раз подать заявку и получить уже готовое решение от банков!
                  </p>
                  <div className="bg-white/10 p-4 rounded-lg mt-6">
                    <div className="flex items-start gap-3">
                      <Icon name="Mail" size={24} className="text-white mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold mb-2">Процесс работы:</p>
                        <p className="text-sm">
                          Все ссылки на подписания будут приходить к вам на почту. В случае дополнительных документов наш менеджер с вами свяжется по почте или в удобном для вас мессенджере.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Guarantee Form */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-green-600 mb-4 tracking-tight">
              Заполнение заявки
            </h2>
            <div className="w-24 h-1 bg-bank-blue mx-auto"></div>
          </div>
          
          <Card className="shadow-xl border-2 border-bank-silver">
            <CardHeader className="bg-gradient-to-r from-bank-navy to-bank-blue text-white">
              <CardTitle className="text-xl flex items-center gap-3 text-green-300">
                <Icon name="Edit3" size={24} />
                Данные банковской гарантии
              </CardTitle>
              <CardDescription className="text-bank-light">
                Укажите основную информацию для оформления гарантии
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="tender-link" className="text-base font-semibold text-bank-navy">
                      Ссылка на тендер
                    </Label>
                    <Input 
                      id="tender-link"
                      placeholder="https://zakupki.gov.ru/..."
                      value={tenderLink}
                      onChange={(e) => setTenderLink(e.target.value)}
                      className="mt-2 h-12 border-2 border-bank-silver focus:border-bank-blue"
                    />
                  </div>

                  <div>
                    <Label htmlFor="guarantee-amount" className="text-base font-semibold text-bank-navy">
                      Сумма гарантии
                    </Label>
                    <Input 
                      id="guarantee-amount"
                      placeholder="Например: 1 000 000 ₽"
                      value={guaranteeAmount}
                      onChange={(e) => setGuaranteeAmount(e.target.value)}
                      className="mt-2 h-12 border-2 border-bank-silver focus:border-bank-blue"
                    />
                  </div>

                  <div>
                    <Label htmlFor="federal-law" className="text-base font-semibold text-bank-navy">
                      По какому ФЗ
                    </Label>
                    <Input 
                      id="federal-law"
                      placeholder="Например: ФЗ №44, ФЗ №223"
                      value={federalLaw}
                      onChange={(e) => setFederalLaw(e.target.value)}
                      className="mt-2 h-12 border-2 border-bank-silver focus:border-bank-blue"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="guarantee-type" className="text-base font-semibold text-bank-navy">
                      Вид гарантии
                    </Label>
                    <Select value={selectedGuaranteeType} onValueChange={setSelectedGuaranteeType}>
                      <SelectTrigger className="mt-2 h-12 text-base border-2 border-bank-silver focus:border-bank-blue">
                        <SelectValue placeholder="Выберите вид гарантии" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="participation">Гарантия обеспечения заявки</SelectItem>
                        <SelectItem value="execution">Гарантия исполнения контракта</SelectItem>
                        <SelectItem value="warranty">Гарантия устранения недостатков</SelectItem>
                        <SelectItem value="advance">Гарантия возврата аванса</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="guarantee-period" className="text-base font-semibold text-bank-navy">
                      Срок гарантии
                    </Label>
                    <Input 
                      id="guarantee-period"
                      placeholder="Например: 12 месяцев"
                      value={guaranteePeriod}
                      onChange={(e) => setGuaranteePeriod(e.target.value)}
                      className="mt-2 h-12 border-2 border-bank-silver focus:border-bank-blue"
                    />
                  </div>

                  <div>
                    <Label htmlFor="access-key" className="text-base font-semibold text-bank-navy">
                      <Icon name="Key" size={16} className="inline mr-2" />
                      Ключ доступа
                    </Label>
                    <Input 
                      id="access-key"
                      type="password"
                      placeholder="Введите ключ доступа"
                      value={accessKey}
                      onChange={(e) => setAccessKey(e.target.value)}
                      className="mt-2 h-12 border-2 border-bank-silver focus:border-bank-blue"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents Upload Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-green-600 mb-4 tracking-tight">
              Перечень необходимых документов
            </h2>
            <div className="w-24 h-1 bg-bank-blue mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {requiredDocuments.map((doc, idx) => (
              <Card key={doc.id} className="shadow-lg border-2 border-bank-silver hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-bank-navy text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {idx + 1}
                        </div>
                        <div className="text-base font-semibold text-bank-navy">
                          {doc.name}
                        </div>
                      </div>
                      <div className="text-sm text-bank-slate ml-11">
                        {uploadedFiles[doc.id]?.length > 0 
                          ? (
                            <div className="flex items-center gap-2 text-bank-green">
                              <Icon name="CheckCircle" size={16} />
                              Загружено файлов: {uploadedFiles[doc.id].length}
                            </div>
                          )
                          : (
                            <div className="flex items-center gap-2 text-bank-slate">
                              <Icon name="Upload" size={16} />
                              Файл не загружен
                            </div>
                          )
                        }
                      </div>
                    </div>
                    <div className="ml-4">
                      <input 
                        type="file" 
                        multiple 
                        className="hidden" 
                        id={`upload-doc-${doc.id}`}
                        onChange={(e) => handleFileUpload(doc.id, e.target.files)}
                      />
                      <Button 
                        variant="outline"
                        size="sm"
                        className="border-2 border-bank-navy text-bank-navy hover:bg-bank-navy hover:text-white transition-all duration-300"
                        onClick={() => document.getElementById(`upload-doc-${doc.id}`)?.click()}
                      >
                        <Icon name="Paperclip" size={16} className="mr-2" />
                        Загрузить
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Final Submit Button */}
        <div className="text-center mb-16">
          <Button 
            size="lg" 
            onClick={handleSubmit}
            disabled={isSubmitting || !accessKey}
            className="bg-gradient-to-r from-bank-navy to-bank-blue hover:from-bank-blue hover:to-bank-navy text-white font-semibold text-lg px-16 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Icon name="Loader2" size={24} className="mr-4 animate-spin" />
                Отправка заявки...
              </>
            ) : (
              <>
                <Icon name="Send" size={24} className="mr-4" />
                Подать заявку на банковскую гарантию
              </>
            )}
          </Button>
          <p className="text-sm text-bank-slate mt-4">
            📧 Заявка будет отправлена на <strong>garantiya25@mail.ru</strong>
          </p>
          {accessKey && accessKey !== 'ba42c3d9-0cfe-43b4-816a-cbe491f04fca' && (
            <p className="text-sm text-red-600 mt-2">
              ❌ Неверный ключ доступа
            </p>
          )}
          {accessKey === 'ba42c3d9-0cfe-43b4-816a-cbe491f04fca' && (
            <p className="text-sm text-green-600 mt-2">
              ✅ Ключ доступа действителен
            </p>
          )}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-bank-navy to-bank-blue p-12 rounded-2xl shadow-2xl">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { icon: 'Building2', label: 'Банков-партнеров', value: '30+', color: 'text-white' },
              { icon: 'FileText', label: 'Выданных гарантий', value: '5000+', color: 'text-white' },
              { icon: 'Clock', label: 'Среднее время', value: '24ч', color: 'text-white' },
              { icon: 'Shield', label: 'Успешных сделок', value: '98%', color: 'text-white' }
            ].map((stat, idx) => (
              <div key={idx} className="text-white">
                <Icon name={stat.icon as any} size={40} className="mx-auto mb-4 opacity-90" />
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm opacity-90 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;