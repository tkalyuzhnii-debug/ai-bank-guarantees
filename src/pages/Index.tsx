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
                <p className="text-sm text-muted-foreground">Партнеры ведущих российских банков</p>
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
        {/* Guarantee Type Selection */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-bank-gray mb-2">Выберите тип гарантии</h2>

          </div>
          
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <Label htmlFor="guarantee-type" className="text-lg font-medium">Тип гарантии</Label>
                <Select value={selectedGuaranteeType} onValueChange={setSelectedGuaranteeType}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Выберите тип банковской гарантии" />
                  </SelectTrigger>
                  <SelectContent>
                    {guaranteeTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex flex-col">
                          <span className="font-medium">{type.label}</span>
                          <span className="text-sm text-muted-foreground">{type.range}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedGuaranteeType && (
                <div className="grid md:grid-cols-2 gap-6 pt-6 border-t">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="federal-law">По какому ФЗ</Label>
                      <Input 
                        id="federal-law"
                        placeholder="Например: ФЗ №44, ФЗ №223"
                        value={federalLaw}
                        onChange={(e) => setFederalLaw(e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="tender-link">Ссылка на тендер</Label>
                      <Input 
                        id="tender-link"
                        placeholder="https://zakupki.gov.ru/..."
                        value={tenderLink}
                        onChange={(e) => setTenderLink(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="guarantee-amount">Сумма гарантии</Label>
                      <Input 
                        id="guarantee-amount"
                        placeholder="Например: 1 000 000 ₽"
                        value={guaranteeAmount}
                        onChange={(e) => setGuaranteeAmount(e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="guarantee-period">Срок гарантии</Label>
                      <Input 
                        id="guarantee-period"
                        placeholder="Например: 12 месяцев"
                        value={guaranteePeriod}
                        onChange={(e) => setGuaranteePeriod(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Documents Upload Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-bank-gray mb-6 text-center">
            Перечень необходимых документов
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
                      {uploadedFiles[doc.id]?.length > 0 
                        ? `Загружено файлов: ${uploadedFiles[doc.id].length}`
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
        <div className="text-center mb-12">
          <Button size="lg" className="bg-gradient-to-r from-bank-blue to-bank-green hover:opacity-90 text-lg px-12 py-3">
            <Icon name="Send" size={20} className="mr-3" />
            Подать заявку на банковскую гарантию
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 text-center">
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