'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  lessonsCount: number;
  completed?: boolean;
  locked?: boolean;
}

export function ModuleCard({
  id,
  title,
  description,
  lessonsCount,
  completed = false,
  locked = false,
}: ModuleCardProps) {
  return (
    <div className={`border rounded-lg overflow-hidden ${locked ? 'opacity-70' : ''}`}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          {completed && (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Завершено
            </span>
          )}
          {locked && (
            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Заблокировано
            </span>
          )}
        </div>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{lessonsCount} уроков</span>
          {locked ? (
            <Button
              variant="ghost"
              size="sm"
              disabled
            >
              Заблокировано
            </Button>
          ) : (
            <Link href={`/course/module/${id}`}>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
              >
                Начать
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
