import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Добро пожаловать! Я помогу вам с банковскими гарантиями. Какую сумму вы рассматриваете?' }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [moscowTime, setMoscowTime] = useState(new Date());
  const [vladTime, setVladTime] = useState(new Date());
  const [currencyRates] = useState({
    usd: 89.45,
    eur: 95.67,
    cny: 12.34
  });

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

  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: {[docId: string]: File[]}}>(
    requiredDocuments.reduce((acc, doc) => {
      acc[doc.id] = {};
      return acc;
    }, {} as {[key: string]: {[docId: string]: File[]}})
  );
  
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
      id: 'commercial',
      title: 'Коммерческая гарантия',
      range: '1 000 - 1 000 000 ₽',
      description: 'Для небольших коммерческих сделок',
      features: ['Быстрое оформление', 'Минимум документов', 'Решение в день обращения'],
      color: 'bg-emerald-500',
      icon: 'HandCoins',
      fzInfo: 'ФЗ №44, ФЗ №223',
      tenderLink: 'https://zakupki.gov.ru',
      duration: '1-12 месяцев',
      amount: '1 000 - 1 000 000 ₽'
    },
    {
      id: 'express',
      title: 'Экспресс-гарантии',
      range: '1 000 - 5 000 000 ₽',
      description: 'Быстрое оформление за 1-2 дня',
      features: ['Минимальный пакет документов', 'Онлайн оформление', 'Решение за 24 часа'],
      color: 'bg-bank-green',
      icon: 'Zap',
      fzInfo: 'ФЗ №44, ФЗ №223',
      tenderLink: 'https://zakupki.gov.ru',
      duration: '3-24 месяца',
      amount: '1 000 - 5 000 000 ₽'
    },
    {
      id: 'standard', 
      title: 'Стандартные гарантии',
      range: '5 000 000 - 100 000 000 ₽',
      description: 'Оптимальные условия для большинства сделок',
      features: ['Гибкие условия', '30 банков-партнеров', 'Персональный менеджер'],
      color: 'bg-bank-blue',
      icon: 'Building2',
      fzInfo: 'ФЗ №44, ФЗ №223, ФЗ №615',
      tenderLink: 'https://zakupki.gov.ru',
      duration: '6-36 месяцев',
      amount: '5 000 000 - 100 000 000 ₽'
    },
    {
      id: 'large',
      title: 'Крупные гарантии', 
      range: 'от 100 000 000 ₽',
      description: 'Для масштабных проектов и госконтрактов',
      features: ['Индивидуальный подход', 'Консорциумы банков', 'VIP обслуживание'],
      color: 'bg-gradient-to-r from-bank-blue to-bank-green',
      icon: 'Crown',
      fzInfo: 'ФЗ №44, ФЗ №223, ФЗ №615',
      tenderLink: 'https://zakupki.gov.ru',
      duration: '12-60 месяцев',
      amount: 'от 100 000 000 ₽'
    }
  ];

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    
    const newMessages = [
      ...chatMessages,
      { role: 'user', content: currentMessage },
      { 
        role: 'assistant', 
        content: 'Понимаю ваш вопрос. Для подбора оптимального банка и условий мне нужно больше информации о вашем проекте. Какой тип гарантии вам нужен?'
      }
    ];
    setChatMessages(newMessages);
    setCurrentMessage('');
  };

  const handleFileUpload = (docId: string, files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      setUploadedFiles(prev => ({
        ...prev,
        [docId]: {
          ...prev[docId],
          files: [...(prev[docId]?.files || []), ...newFiles]
        }
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bank-light to-white">
      {/* Currency Ticker */}
      <div className="bg-bank-gray text-white py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex space-x-8">
          <span>USD: {currencyRates.usd} ₽</span>
          <span>EUR: {currencyRates.eur} ₽</span>
          <span>CNY: {currencyRates.cny} ₽</span>
          <span>USD: {currencyRates.usd} ₽</span>
          <span>EUR: {currencyRates.eur} ₽</span>
          <span>CNY: {currencyRates.cny} ₽</span>
        </div>
      </div>
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Building2" size={32} className="text-bank-blue" />
              <div>
                <h1 className="text-2xl font-bold text-bank-gray">Банковские Гарантии РУ</h1>
                <p className="text-sm text-muted-foreground">30 банков • ИИ-консультант • Быстрое оформление</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm space-y-1">
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} className="text-bank-blue" />
                  <span>Москва: {moscowTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} className="text-bank-green" />
                  <span>Владивосток: {vladTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
              <Badge variant="outline" className="text-bank-green border-bank-green">
                Онлайн 24/7
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Guarantee Cards */}
          <div className="lg:col-span-2 space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-bank-gray mb-2">Выберите тип гарантии</h2>
              <p className="text-muted-foreground">Работаем с 30 ведущими банками России</p>
            </div>

            <div className="grid md:grid-cols-1 gap-6">
              {guaranteeTypes.map((type) => (
                <Card key={type.id} className="hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-lg ${type.color}`}>
                          <Icon name={type.icon as any} size={24} className="text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-bank-gray">{type.title}</CardTitle>
                          <CardDescription className="text-bank-blue font-semibold text-lg">
                            {type.range}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary">{type.description}</Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {type.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <Icon name="Check" size={16} className="text-bank-green" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Guarantee Info Block */}
                    <div className="bg-muted p-4 rounded-lg space-y-3">
                      <h4 className="font-semibold text-bank-gray">Описание гарантии</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">По ФЗ:</span>
                          <div className="font-medium">{type.fzInfo}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Ссылка на тендер:</span>
                          <a href={type.tenderLink} target="_blank" className="text-bank-blue hover:underline block">
                            zakupki.gov.ru
                          </a>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Срок гарантии:</span>
                          <div className="font-medium">{type.duration}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Сумма гарантии:</span>
                          <div className="font-medium">{type.amount}</div>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-bank-blue hover:bg-bank-blue/90">
                      Подать заявку
                      <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* AI Chat */}
          <div className="lg:col-span-1">
            <Card className="h-fit sticky top-4">
              <CardHeader className="bg-gradient-to-r from-bank-blue to-bank-green text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Bot" size={20} />
                  ИИ-консультант
                </CardTitle>
                <CardDescription className="text-white/90">
                  Помогу с выбором банка и ответами на возражения
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="h-80 overflow-y-auto p-4 space-y-3">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        msg.role === 'user' 
                          ? 'bg-bank-blue text-white' 
                          : 'bg-muted'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t p-4 space-y-3">
                  <Textarea 
                    placeholder="Задайте вопрос о гарантиях..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    className="resize-none"
                    rows={2}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="w-full bg-bank-green hover:bg-bank-green/90"
                    disabled={!currentMessage.trim()}
                  >
                    <Icon name="Send" size={16} className="mr-2" />
                    Отправить
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Documents Upload Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-bank-gray mb-6 text-center">
            Перечень необходимых документов для ООО
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {requiredDocuments.map((doc, idx) => (
              <Card key={doc.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-bank-gray">
                      {idx + 1}. {doc.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {uploadedFiles[doc.id]?.files?.length > 0 
                        ? `Загружено файлов: ${uploadedFiles[doc.id].files.length}`
                        : 'Файл не загружен'
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
                      size="sm" 
                      variant="outline"
                      onClick={() => document.getElementById(`upload-doc-${doc.id}`)?.click()}
                    >
                      <Icon name="Paperclip" size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Final Submit Button */}
        <div className="mt-12 text-center">
          <Button size="lg" className="bg-gradient-to-r from-bank-blue to-bank-green hover:opacity-90 text-lg px-12 py-3">
            <Icon name="Send" size={20} className="mr-3" />
            Подать заявку на банковскую гарантию
          </Button>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid md:grid-cols-4 gap-6 text-center">
          {[
            { icon: 'Building2', label: 'Банков-партнеров', value: '30+' },
            { icon: 'FileText', label: 'Выданных гарантий', value: '5000+' },
            { icon: 'Clock', label: 'Среднее время', value: '24ч' },
            { icon: 'Shield', label: 'Успешных сделок', value: '98%' }
          ].map((stat, idx) => (
            <Card key={idx} className="p-6">
              <Icon name={stat.icon as any} size={32} className="text-bank-blue mx-auto mb-3" />
              <div className="text-2xl font-bold text-bank-gray mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;