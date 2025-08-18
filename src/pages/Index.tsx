import React, { useState } from 'react';
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
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: File[]}>({
    express: [],
    standard: [],
    large: []
  });

  const guaranteeTypes = [
    {
      id: 'express',
      title: 'Экспресс-гарантии',
      range: '1 000 000 - 5 000 000 ₽',
      description: 'Быстрое оформление за 1-2 дня',
      features: ['Минимальный пакет документов', 'Онлайн оформление', 'Решение за 24 часа'],
      color: 'bg-bank-green',
      icon: 'Zap'
    },
    {
      id: 'standard', 
      title: 'Стандартные гарантии',
      range: '1 000 000 - 100 000 000 ₽',
      description: 'Оптимальные условия для большинства сделок',
      features: ['Гибкие условия', '30 банков-партнеров', 'Персональный менеджер'],
      color: 'bg-bank-blue',
      icon: 'Building2'
    },
    {
      id: 'large',
      title: 'Крупные гарантии', 
      range: 'от 100 000 000 ₽',
      description: 'Для масштабных проектов и госконтрактов',
      features: ['Индивидуальный подход', 'Консорциумы банков', 'VIP обслуживание'],
      color: 'bg-gradient-to-r from-bank-blue to-bank-green',
      icon: 'Crown'
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

  const handleFileUpload = (type: string, files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      setUploadedFiles(prev => ({
        ...prev,
        [type]: [...prev[type], ...newFiles]
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bank-light to-white">
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
            <Badge variant="outline" className="text-bank-green border-bank-green">
              Онлайн 24/7
            </Badge>
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
                  
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {type.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <Icon name="Check" size={16} className="text-bank-green" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                        <Icon name="Paperclip" size={20} className="text-bank-gray" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Загрузить документы</p>
                          <p className="text-xs text-muted-foreground">
                            {uploadedFiles[type.id].length > 0 
                              ? `Загружено файлов: ${uploadedFiles[type.id].length}`
                              : 'Перетащите файлы или нажмите для выбора'
                            }
                          </p>
                        </div>
                        <input 
                          type="file" 
                          multiple 
                          className="hidden" 
                          id={`upload-${type.id}`}
                          onChange={(e) => handleFileUpload(type.id, e.target.files)}
                        />
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => document.getElementById(`upload-${type.id}`)?.click()}
                        >
                          Выбрать
                        </Button>
                      </div>
                      
                      <Button className="w-full bg-bank-blue hover:bg-bank-blue/90">
                        Подать заявку
                        <Icon name="ArrowRight" size={16} className="ml-2" />
                      </Button>
                    </div>
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