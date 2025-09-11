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

      // Создаем архив с файлами для скачивания
      const hasFiles = Object.values(uploadedFiles).some(files => files.length > 0);
      
      if (hasFiles) {
        // Показываем инструкции по отправке файлов
        const instruction = `
✅ ЗАЯВКА ПОДГОТОВЛЕНА!

📋 ДАННЫЕ ОТПРАВЛЕНЫ В ПОЧТОВЫЙ КЛИЕНТ

📁 ОТПРАВКА ФАЙЛОВ - ВЫБЕРИТЕ СПОСОБ:

1️⃣ ЧЕРЕЗ ПОЧТОВЫЙ КЛИЕНТ:
   • Откройте письмо в почтовом клиенте
   • Прикрепите файлы документов вручную
   • Отправьте на garantiya25@mail.ru

2️⃣ ЧЕРЕЗ TELEGRAM:
   • Отправьте заявку + файлы консультанту
   • @IT_business_service_selle

3️⃣ ЧЕРЕЗ ОБЛАЧНОЕ ХРАНИЛИЩЕ:
   • Загрузите файлы в Яндекс.Диск / Google Drive
   • Отправьте ссылку на garantiya25@mail.ru

⚠️ ФАЙЛЫ НЕ МОГУТ БЫТЬ ОТПРАВЛЕНЫ АВТОМАТИЧЕСКИ из браузера по соображениям безопасности.
`;
        
        alert(instruction);
        
        // Создаем файл с информацией для скачивания
        const instructionBlob = new Blob([emailContent + '\n\n' + instruction], { type: 'text/plain;charset=utf-8' });
        const instructionUrl = URL.createObjectURL(instructionBlob);
        const instructionLink = document.createElement('a');
        instructionLink.href = instructionUrl;
        instructionLink.download = `Заявка_${Date.now()}.txt`;
        document.body.appendChild(instructionLink);
        instructionLink.click();
        document.body.removeChild(instructionLink);
        URL.revokeObjectURL(instructionUrl);
      }
      
      // Создаем mailto ссылку для отправки
      const subject = encodeURIComponent('Заявка на банковскую гарантию');
      const body = encodeURIComponent(emailContent);
      const mailtoLink = `mailto:garantiya25@mail.ru?subject=${subject}&body=${body}`;
      
      // Открываем почтовый клиент
      window.location.href = mailtoLink;
      
      // Показываем сообщение для случаев без файлов
      if (!hasFiles) {
        setTimeout(() => {
          alert('✅ Заявка отправлена в почтовый клиент!\n\nПисьмо подготовлено для отправки на garantiya25@mail.ru');
        }, 1000);
      }
      
      // Очищаем форму после подготовки к отправке
      setTimeout(() => {
        setTenderLink('');
        setGuaranteeAmount('');
        setFederalLaw('');
        setSelectedGuaranteeType('');
        setGuaranteePeriod('');
        setAccessKey('ba42c3d9-0cfe-43b4-816a-cbe491f04fca');
        setUploadedFiles({});
      }, 2000);
      
    } catch (error) {
      console.error('Ошибка подготовки заявки:', error);
      alert('❌ Ошибка при подготовке заявки. Попробуйте снова.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Банковские Гарантии РУ
            </h1>
            <p className="text-gray-600 mb-4">Партнеры ведущих российских банков</p>
            <div className="text-center">
              <p className="text-lg text-gray-800 max-w-3xl mx-auto mb-6">
                Сайт создан в целях автоматизации выпуска банковской гарантии, для того чтобы уйти от телефонных переговоров, 
                а сразу же приступить к оформлению банковской гарантии.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg max-w-2xl mx-auto">
                <div className="flex items-start gap-3">
                  <Icon name="Mail" size={24} className="text-blue-600 mt-1 flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 mb-2">Процесс работы:</p>
                    <p className="text-gray-700">
                      Все ссылки на подписания будут приходить к вам на почту. В случае дополнительных документов наш менеджер 
                      с вами свяжется по почте или в удобном для вас мессенджере.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">

        {/* Guarantee Form */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-green-600 mb-4 tracking-tight">
              Заполнение заявки
            </h2>
            <div className="w-24 h-1 bg-bank-blue mx-auto"></div>
          </div>
          
          <Card className="shadow-xl border-2 border-bank-silver bg-white/95 backdrop-blur-sm">
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
              <Card key={doc.id} className="shadow-lg border-2 border-bank-silver hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
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

        {/* Contacts Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-green-600 mb-4 tracking-tight">
              Контакты
            </h2>
            <div className="w-24 h-1 bg-bank-blue mx-auto"></div>
          </div>
          
          <Card className="shadow-2xl border-2 border-bank-silver bg-gradient-to-br from-white/95 to-bank-light/90 backdrop-blur-sm">
            <CardContent className="p-12">
              <div className="text-center space-y-8">
                <div className="flex items-center justify-center">
                  <div className="p-4 bg-gradient-to-r from-bank-navy to-bank-blue rounded-full">
                    <Icon name="Mail" size={48} className="text-white" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-bank-navy">
                    Свяжитесь с нами
                  </h3>
                  <p className="text-lg text-bank-slate leading-relaxed">
                    Для получения консультации по банковским гарантиям и подачи заявки
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-bank-navy to-bank-blue p-6 rounded-2xl shadow-xl">
                    <div className="text-center">
                      <Icon name="AtSign" size={24} className="text-white mx-auto mb-3" />
                      <div className="text-sm text-white/80 mb-2">Email</div>
                      <a 
                        href="mailto:garantiya25@mail.ru" 
                        className="text-xl font-bold text-white hover:text-yellow-300 transition-colors duration-300 break-all"
                      >
                        garantiya25@mail.ru
                      </a>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-2xl shadow-xl">
                    <div className="text-center">
                      <Icon name="MessageCircle" size={24} className="text-white mx-auto mb-3" />
                      <div className="text-sm text-white/80 mb-2">Telegram консультант</div>
                      <a 
                        href="https://t.me/IT_business_service_selle" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl font-bold text-white hover:text-yellow-300 transition-colors duration-300"
                      >
                        @IT_business_service_selle
                      </a>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-white/80">Онлайн</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center p-4 bg-white/90 backdrop-blur-sm rounded-lg border border-bank-silver shadow-md">
                    <Icon name="Clock" size={24} className="mx-auto mb-2 text-bank-blue" />
                    <div className="text-sm font-semibold text-bank-navy">Работаем</div>
                    <div className="text-sm text-bank-slate">24/7</div>
                  </div>
                  <div className="text-center p-4 bg-white/90 backdrop-blur-sm rounded-lg border border-bank-silver shadow-md">
                    <Icon name="Zap" size={24} className="mx-auto mb-2 text-bank-blue" />
                    <div className="text-sm font-semibold text-bank-navy">Быстрый ответ</div>
                    <div className="text-sm text-bank-slate">В течение часа</div>
                  </div>
                  <div className="text-center p-4 bg-white/90 backdrop-blur-sm rounded-lg border border-bank-silver shadow-md">
                    <Icon name="Shield" size={24} className="mx-auto mb-2 text-bank-blue" />
                    <div className="text-sm font-semibold text-bank-navy">Надежность</div>
                    <div className="text-sm text-bank-slate">Официальные партнеры</div>
                  </div>
                </div>

                {/* File Upload Instructions */}
                <div className="mt-8 p-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Icon name="FileText" size={24} className="text-yellow-600" />
                    <h4 className="text-lg font-bold text-yellow-800">
                      Как отправить документы
                    </h4>
                  </div>
                  <div className="text-sm text-yellow-800 space-y-2">
                    <p className="font-semibold">📎 Файлы документов отправляйте одним из способов:</p>
                    <div className="grid md:grid-cols-3 gap-4 mt-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Icon name="Mail" size={16} className="text-yellow-600" />
                          <span className="font-semibold">Email:</span>
                        </div>
                        <p>Прикрепите файлы к письму на garantiya25@mail.ru</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Icon name="MessageCircle" size={16} className="text-yellow-600" />
                          <span className="font-semibold">Telegram:</span>
                        </div>
                        <p>Отправьте документы консультанту @IT_business_service_selle</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Icon name="Cloud" size={16} className="text-yellow-600" />
                          <span className="font-semibold">Облако:</span>
                        </div>
                        <p>Загрузите в облако и отправьте ссылку</p>
                      </div>
                    </div>
                    <p className="text-xs mt-4 text-yellow-700">
                      ⚠️ Автоматическая отправка файлов через браузер невозможна по соображениям безопасности
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-bank-navy text-white py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-white rounded-lg">
              <Icon name="Building2" size={24} className="text-bank-navy" />
            </div>
            <span className="text-xl font-bold text-yellow-400">Банковские Гарантии РУ</span>
          </div>
          <p className="text-bank-light mb-4">
            Официальные партнеры ведущих российских банков
          </p>
          <div className="flex items-center justify-center gap-2 text-sm">
            <Icon name="Mail" size={16} />
            <a href="mailto:garantiya25@mail.ru" className="hover:text-yellow-300 transition-colors">
              garantiya25@mail.ru
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Telegram Consultant */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="group relative">
          {/* Consultation bubble */}
          <div className="absolute bottom-16 right-0 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="bg-gradient-to-r from-bank-navy to-bank-blue text-white px-4 py-3 rounded-lg shadow-xl border border-white/20 backdrop-blur-sm max-w-xs">
              <div className="text-sm font-semibold mb-1">💬 Онлайн консультант</div>
              <div className="text-xs opacity-90">
                Нужна помощь с банковской гарантией? Напишите нам в Telegram!
              </div>
              {/* Arrow pointer */}
              <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gradient-to-r from-bank-navy to-bank-blue border-r border-b border-white/20"></div>
            </div>
          </div>

          {/* Main consultant button */}
          <a
            href="https://t.me/IT_business_service_selle"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 animate-pulse hover:animate-none"
          >
            <Icon name="MessageCircle" size={28} />
          </a>

          {/* Online indicator */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
          </div>

          {/* Floating animation rings */}
          <div className="absolute inset-0 rounded-full border-2 border-blue-400 opacity-75 animate-ping"></div>
          <div className="absolute inset-0 rounded-full border-2 border-blue-300 opacity-50 animate-ping" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Index;