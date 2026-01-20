import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Свяжитесь с нами</h1>
      
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Контактная информация */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-6">Контактная информация</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <Mail className="h-6 w-6 text-gray-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium">Email</p>
                <a href="mailto:info@linuxcourse.ru" className="text-blue-600 hover:underline">
                  info@linuxcourse.ru
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="h-6 w-6 text-gray-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium">Телефон</p>
                <a href="tel:+78001234567" className="text-blue-600 hover:underline">
                  +7 (800) 123-45-67
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-gray-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium">Адрес</p>
                <p className="text-gray-700">
                  г. Москва, ул. Примерная, д. 123, офис 456
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Мы в социальных сетях</h3>
            <div className="flex space-x-4">
              <a href="https://t.me/linuxcourse" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm-1.95 14.38l-.07-1.05c-.07-.28-.02-.59.13-.83l3.09-4.9c.04-.08-.04-.17-.12-.14l-3.81 1.42c-.08.03-.16-.04-.16-.12l.03-1.86c0-.12-.12-.2-.23-.15l-1.47.7c-.14.07-.3.03-.39-.08l-1.07-1.21c-.1-.12-.3-.12-.4 0l-1.07 1.21c-.09.11-.25.15-.39.08l-1.47-.7c-.11-.05-.23.03-.23.15l.03 1.86c0 .08-.08.15-.16.12l-3.81-1.42c-.08-.03-.16.06-.12.14l3.09 4.9c.15.24.2.55.13.83l-.07 1.05c-.03.22.16.4.38.34l3.24-.9c.11-.03.22-.03.33 0l3.24.9c.22.06.41-.12.38-.34z" />
                </svg>
              </a>
              <a href="https://vk.com/linuxcourse" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.597-.19 1.364 1.259 2.182 1.818.618.422 1.084.33 1.084.33l2.182.029s1.14.071.6-.966c-.044-.79-.313-.71-1.757-2.006-1.484-1.338-1.28-1.116.502-3.426 1.088-1.407 1.525-2.264 1.387-2.633-.13-.343-.93-.252-.93-.252l-2.458.015s-.184-.025-.319.056c-.134.079-.22.262-.22.262s-.392 1.045-.915 1.93c-1.104 1.862-1.545 1.96-1.725 1.845-.42-.277-.315-1.109-.315-1.698 0-1.846.28-2.618-.546-2.818-.273-.066-.475-.11-1.18-.117-.9-.01-1.667.003-2.099.214-.288.14-.51.452-.374.47.167.022.546.099.746.362.26.342.25 1.11.25 1.11s.15 2.115-.347 2.379c-.342.18-.81-.187-1.813-1.879-.516-.88-.904-1.853-.904-1.853s-.075-.183-.209-.281c-.162-.119-.39-.157-.39-.157l-2.344.015s-.351.01-.48.162c-.115.135-.01.414-.01.414s1.834 4.294 3.914 6.464c1.906 1.988 4.07 1.856 4.07 1.856h.98z" />
                </svg>
              </a>
              <a href="https://github.com/linuxcourse" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://youtube.com/linuxcourse" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Форма обратной связи */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-6">Напишите нам</h2>
          
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Имя
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Тема
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Сообщение
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <Button type="submit" className="w-full">
                Отправить сообщение
              </Button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Карта */}
      <div className="mt-12 max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6">Наше местоположение</h2>
        <div className="aspect-w-16 aspect-h-9 h-96 w-full">
          {/* Здесь будет интеграция с картой, например Google Maps или Яндекс.Карты */}
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">Карта будет загружена здесь</p>
          </div>
        </div>
      </div>
    </div>
  );
}