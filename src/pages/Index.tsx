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
    cny: 12.34
  });
  
  const [selectedGuaranteeType, setSelectedGuaranteeType] = useState('');
  const [federalLaw, setFederalLaw] = useState('');
  const [tenderLink, setTenderLink] = useState('');
  const [guaranteeAmount, setGuaranteeAmount] = useState('');
  const [guaranteePeriod, setGuaranteePeriod] = useState('');

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-bank-light to-white">
      {/* Currency Ticker */}
      <div className="bg-bank-navy text-white py-2.5 border-b border-bank-silver">
        <div className="animate-marquee whitespace-nowrap flex space-x-12 text-sm font-medium">
          <span className="flex items-center gap-2">
            <Icon name="TrendingUp" size={14} />
            USD: {currencyRates.usd} ₽
          </span>
          <span className="flex items-center gap-2">
            <Icon name="TrendingUp" size={14} />
            EUR: {currencyRates.eur} ₽
          </span>
          <span className="flex items-center gap-2">
            <Icon name="TrendingUp" size={14} />
            CNY: {currencyRates.cny} ₽
          </span>
          <span className="flex items-center gap-2">
            <Icon name="TrendingUp" size={14} />
            USD: {currencyRates.usd} ₽
          </span>
          <span className="flex items-center gap-2">
            <Icon name="TrendingUp" size={14} />
            EUR: {currencyRates.eur} ₽
          </span>
          <span className="flex items-center gap-2">
            <Icon name="TrendingUp" size={14} />
            CNY: {currencyRates.cny} ₽
          </span>
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
                <h1 className="text-3xl font-bold text-bank-navy tracking-tight">
                  Банковские Гарантии РУ
                </h1>
                <p className="text-bank-slate font-medium">Партнеры ведущих российских банков</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="bg-bank-light p-4 rounded-lg border border-bank-silver">
                <div className="text-sm space-y-2">
                  <div className="flex items-center gap-3">
                    <Icon name="Clock" size={16} className="text-bank-navy" />
                    <span className="text-bank-navy font-medium">
                      МСК: {moscowTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Clock" size={16} className="text-bank-slate" />
                    <span className="text-bank-slate font-medium">
                      ВЛД: {vladTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
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
                  <h2 className="text-2xl font-bold">
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

        {/* Guarantee Type Selection */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-bank-navy mb-4 tracking-tight">
              Выберите тип гарантии
            </h2>
            <div className="w-24 h-1 bg-bank-blue mx-auto"></div>
          </div>
          
          <Card className="shadow-xl border-2 border-bank-silver">
            <CardHeader className="bg-gradient-to-r from-bank-navy to-bank-blue text-white">
              <CardTitle className="text-xl flex items-center gap-3">
                <Icon name="FileText" size={24} />
                Параметры банковской гарантии
              </CardTitle>
              <CardDescription className="text-bank-light">
                Заполните основную информацию для подбора оптимального предложения
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-8">
                <div>
                  <Label htmlFor="guarantee-type" className="text-lg font-semibold text-bank-navy">
                    Тип гарантии
                  </Label>
                  <Select value={selectedGuaranteeType} onValueChange={setSelectedGuaranteeType}>
                    <SelectTrigger className="mt-3 h-12 text-base border-2 border-bank-silver focus:border-bank-blue">
                      <SelectValue placeholder="Выберите тип банковской гарантии" />
                    </SelectTrigger>
                    <SelectContent>
                      {guaranteeTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value} className="py-3">
                          <div className="flex flex-col">
                            <span className="font-semibold text-bank-navy">{type.label}</span>
                            <span className="text-sm text-bank-slate">{type.range}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedGuaranteeType && (
                  <div className="grid md:grid-cols-2 gap-8 pt-8 border-t-2 border-bank-silver">
                    <div className="space-y-6">
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
                    </div>

                    <div className="space-y-6">
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
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents Upload Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-bank-navy mb-4 tracking-tight">
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
            className="bg-gradient-to-r from-bank-navy to-bank-blue hover:from-bank-blue hover:to-bank-navy text-white font-semibold text-lg px-16 py-4 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <Icon name="Send" size={24} className="mr-4" />
            Подать заявку на банковскую гарантию
          </Button>
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