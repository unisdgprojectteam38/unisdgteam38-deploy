'use client';

import React, { useState, ReactNode, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
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

import { HeaderSection } from '@/components/info/header/HeaderSection';
import { EventsSection } from '@/components/info/events/EventsSection';
import QuizSectionComponent from '@/components/modulePlayer/sections/quiz/Quiz';
import EditableTextSectionComponent from '@/components/modulePlayer/sections/text/Text';
import ResourceManagerGameComponent from '@/components/modulePlayer/sections/resourceManagerGame/ResourceManagerGame';
import FlashcardSectionComponent from '@/components/modulePlayer/sections/flashcards/Flashcards';

import SectionCarousel from '@/components/builder/SectionCarousel';
import { Button } from '@/components/ui/Button';
import { Plus, GripVertical, X } from 'lucide-react';
import { Section, HeaderData } from '@/types/sections';
import { Input } from '@/components/ui/Input';

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

const SECTION_COMPONENTS: Record<Section['type'], React.FC<{ section: Section; onUpdate: (updatedSection: Section) => void; isEditable?: boolean }>> = {
  quiz: QuizSectionComponent as React.FC<{ section: Section; onUpdate: (updatedSection: Section) => void; isEditable?: boolean }>,
  text: EditableTextSectionComponent as React.FC<{ section: Section; onUpdate: (updatedSection: Section) => void; isEditable?: boolean }>,
  resourceManagerGame: ResourceManagerGameComponent as React.FC<{ section: Section; onUpdate: (updatedSection: Section) => void; isEditable?: boolean }>,
  flashcards: FlashcardSectionComponent as React.FC<{ section: Section; onUpdate: (updatedSection: Section) => void; isEditable?: boolean }>,
  header: HeaderSection as React.FC<{ section: Section; onUpdate: (updatedSection: Section) => void; isEditable?: boolean }>,
  events: EventsSection as React.FC<{ section: Section; onUpdate: (updatedSection: Section) => void; isEditable?: boolean }>,
};



const sectionTypes: Omit<Section, 'id'>[] = [
  { 
    type: 'quiz', 
    title: 'Quiz Section', 
    order_id: 0,
    data: {
      question: '',
      options: [],
      correctAnswer: '',
    },
    onComplete: () => {}
  },
  { 
    type: 'text', 
    title: 'Text Section', 
    order_id: 0,
    data: {
      content: '',
    },
    onComplete: () => {}
  },
  { 
    type: 'resourceManagerGame', 
    title: 'Resource Manager Game', 
    order_id: 0,
    data: {},
    onComplete: () => {}
  },
  { 
    type: 'flashcards', 
    title: 'Flashcard Game', 
    order_id: 0,
    data: {
      title: '',
      cardPairs: [],
    },
    onComplete: () => {}
  },
  { 
    type: 'events', 
    title: 'Events Section', 
    order_id: 0,
    data: {
      title: '',
      description: '',
      events: [],
    },
    onComplete: () => {}
  },
];

const AdminBuilder: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleSubtitle, setModuleSubtitle] = useState('');
  const supabase = createClient();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    // Initialize with a header section
    setSections([
      {
        id: 'header',
        type: 'header',
        title: 'Module Header',
        order_id: 0,
        data: {
          newsTitle: 'Module News',
          newsContent: 'Latest updates for this module',
          mainTitle: 'New Module',
          mainSubtitle: 'Learn and explore',
          backgroundColor: 'bg-blue-500',
          newsBannerColor: 'bg-yellow-300',
          definitionTitle: 'About This Module',
          definitionPara: 'Explore and learn about important concepts',
        } as HeaderData,
        onComplete: () => {},
      },
    ]);
  }, []);

  const handleAddSection = (newSection: Omit<Section, 'id'>) => {
    const id = Date.now().toString();
    const order_id = sections.length;
    
    // Deep clone the newSection object
    const sectionToAdd = JSON.parse(JSON.stringify(newSection));
    
    // Update the order_id
    sectionToAdd.order_id = order_id;
    
    // Add an id to the section
    sectionToAdd.id = id;
    
    // For flashcards and events, we might want to add some initial data
    if (sectionToAdd.type === 'flashcards') {
      sectionToAdd.data.cardPairs = [
        { id: 1, concept: 'Concept 1', details: 'Details 1' },
        { id: 2, concept: 'Concept 2', details: 'Details 2' },
      ];
    } else if (sectionToAdd.type === 'events') {
      sectionToAdd.data.events = [
        {
          imgSrc: '/placeholder.jpg',
          title: 'Event 1',
          date: '2023-01-01',
        },
      ];
    }

    setSections([...sections, sectionToAdd]);
    setIsCarouselOpen(false);
  };

  const handleRemoveSection = (id: string) => {
    setSections(sections.filter(section => section.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setSections((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex).map((item, index) => ({ ...item, order_id: index }));
      });
    }
  };

  const handleSave = async () => {
    try {
      // First, create a new module
      const { data: moduleData, error: moduleError } = await supabase
        .from('module')
        .insert({ title: moduleTitle, subtitle: moduleSubtitle })
        .select()
        .single();

      if (moduleError) throw moduleError;

      // Then, insert all sections
      const { error: sectionsError } = await supabase.from('section').insert(
        sections.map(section => ({
          module_id: moduleData.module_id,
          data: section.data,
          order_id: section.order_id,
          title: section.title,
          section_type: section.type,
        }))
      );

      if (sectionsError) throw sectionsError;

      console.log('Module and sections saved successfully');
    } catch (error) {
      console.error('Error saving module:', error);
    }
  };

  const handleUpdateSection = (updatedSection: Section) => {
    setSections(prevSections => 
      prevSections.map(section => 
        section.id === updatedSection.id ? updatedSection : section
      )
    );
  };

  return (
    <div className="container mx-auto p-4 bg-[#F6F7FB]">
      <h1 className="text-3xl font-bold mb-6">Module Builder</h1>
      <Input
        type="text"
        value={moduleTitle}
        onChange={(e) => setModuleTitle(e.target.value)}
        placeholder="Enter module title"
        className="w-full p-2 mb-4 border rounded"
      />
      <Input
        type="text"
        value={moduleSubtitle}
        onChange={(e) => setModuleSubtitle(e.target.value)}
        placeholder="Enter module subtitle"
        className="w-full p-2 mb-4 border rounded"
      />
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={sections.map(s => s.id)}
          strategy={verticalListSortingStrategy}
        >
          {sections.map((section) => {
            const SectionComponent = SECTION_COMPONENTS[section.type];
            return (
              <SortableItem key={section.id} id={section.id}>
                <div className="flex-grow">
                  <SectionComponent
                    section={section}
                    onUpdate={handleUpdateSection}
                    isEditable={true}
                  />
                </div>
                <Button onClick={() => handleRemoveSection(section.id)} variant="secondary">
                  <X size={24} className="text-red-500" />
                </Button>
              </SortableItem>
            );
          })}
        </SortableContext>
      </DndContext>
      
      <Button onClick={() => setIsCarouselOpen(true)} variant="secondary" className="mb-4">
        <Plus className="mr-2" /> Add Section
      </Button>
      {isCarouselOpen && (
        <SectionCarousel 
          sectionTypes={sectionTypes}
          onSelect={handleAddSection} 
          onClose={() => setIsCarouselOpen(false)} 
        />
      )}
      <Button onClick={handleSave} variant="primary" className="mt-4">Save Module</Button>
    </div>
  );
};

export default AdminBuilder;