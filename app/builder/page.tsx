'use client';

import React, { useState, ReactNode } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import InlineHeaderEditor from '@/components/builder/InlineHeaderEditor';
import SectionCarousel from '@/components/builder/SectionCarousel';
import Portrait3Horizontal from '@/components/builder/sections/Portrait3Horizontal';
import MediumLengthHeading from '@/components/builder/sections/MediumLengthHeading';
import QuizSectionBuilder from '@/components/builder/sections/QuizSectionBuilder';
import { HeaderData, Section } from '@/types/infographics';
import { Button } from '@/components/ui/Button';
import { Plus, GripVertical, X } from 'lucide-react';

const sectionTypes: Omit<Section, 'id' | 'content'>[] = [
  { type: 'portrait3Horizontal', title: '1 Portrait 3 Horizontal' },
  { type: 'mediumLengthHeading', title: 'Medium Length Heading' },
  { type: 'quizSection', title: 'Quiz Section' },
];

interface SortableItemProps {
  id: string;
  children: ReactNode;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-4 border border-gray-200 rounded-lg p-4 relative">
      <div className="flex justify-between items-center mb-2">
        <div {...attributes} {...listeners}>
          <GripVertical size={24} className="text-gray-400 cursor-move" />
        </div>
        {children}
      </div>
    </div>
  );
};

const AdminBuilder: React.FC = () => {
  const [headerData, setHeaderData] = useState<HeaderData>({
    newsTitle: 'Default News Title',
    newsContent: 'Default news content goes here.',
    mainTitle: 'DEFAULT MAIN TITLE',
    mainSubtitle: 'Default main subtitle text.',
    backgroundColor: 'bg-blue-500',
    newsBannerColor: 'bg-orange-300',
  });
  const [sections, setSections] = useState<Section[]>([]);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleHeaderUpdate = (newData: HeaderData) => {
    setHeaderData(newData);
  };

  const handleSave = () => {
    const pageData = {
      header: headerData,
      sections: sections,
    };
    console.log('Saving page data:', JSON.stringify(pageData));
    // TODO: Implement actual save functionality to Supabase
  };

  const handleAddSection = (newSection: Omit<Section, 'id' | 'content'>) => {
    let initialContent: any = {};
    if (newSection.type === 'portrait3Horizontal') {
      initialContent = {
        topic: '',
        description: '',
        images: ['', '', ''],
        headers: ['', '', ''],
        durations: ['', '', ''],
        descriptions: ['', '', ''],
      };
    } else if (newSection.type === 'mediumLengthHeading') {
      initialContent = {
        heading: '',
        description: '',
        buttonText: '',
        imageUrl: '',
        imagePosition: 'right',
      };
    } else if (newSection.type === 'quizSection') {
      initialContent = {
        title: '',
        questions: [],
      };
    }
    setSections([...sections, { ...newSection, content: initialContent, id: Date.now().toString() }]);
    setIsCarouselOpen(false);
  };

  const handleRemoveSection = (id: string) => {
    if (window.confirm('Are you sure you want to remove this section?')) {
      setSections(sections.filter(section => section.id !== id));
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setSections((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const renderSection = (section: Section) => {
    switch (section.type) {
      case 'portrait3Horizontal':
        return (
          <Portrait3Horizontal
            content={section.content}
            onUpdate={(newContent) => {
              const newSections = sections.map(s => 
                s.id === section.id ? { ...s, content: newContent } : s
              );
              setSections(newSections);
            }}
          />
        );
      case 'mediumLengthHeading':
        return (
          <MediumLengthHeading
            content={section.content}
            onUpdate={(newContent) => {
              const newSections = sections.map(s => 
                s.id === section.id ? { ...s, content: newContent } : s
              );
              setSections(newSections);
            }}
          />
        );
      case 'quizSection':
        return (
          <QuizSectionBuilder
            content={section.content}
            onUpdate={(newContent) => {
              const newSections = sections.map(s => 
                s.id === section.id ? { ...s, content: newContent } : s
              );
              setSections(newSections);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Builder</h1>
     
      <div className="mb-4">
        <InlineHeaderEditor initialData={headerData} onUpdate={handleHeaderUpdate} />
      </div>

      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={sections.map(s => s.id)}
          strategy={verticalListSortingStrategy}
        >
          {sections.map((section) => (
            <SortableItem key={section.id} id={section.id}>
              <div className="flex-grow">
                {renderSection(section)}
              </div>
              <Button onClick={() => handleRemoveSection(section.id)} variant="secondary">
                <X size={24} className="text-red-500" />
              </Button>
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>

      <Button onClick={() => setIsCarouselOpen(true)} className="mb-4">
        <Plus className="mr-2" /> Add Section
      </Button>
      {isCarouselOpen && (
        <SectionCarousel 
          sectionTypes={sectionTypes}
          onSelect={handleAddSection} 
          onClose={() => setIsCarouselOpen(false)} 
        />
      )}
      <Button onClick={handleSave}>Save Changes</Button>
    </div>
  );
};

export default AdminBuilder;