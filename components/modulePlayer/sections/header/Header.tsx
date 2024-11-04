import React, { useState, useEffect } from "react";
import { HeaderSection as HeaderSectionType, Section } from "@/types/sections";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";

interface EditableHeaderSectionComponentProps {
  section: HeaderSectionType;  // Update to use HeaderSection specifically
  onUpdate: (updatedSection: Section) => void;
  isEditable?: boolean;
}

const EditableHeaderSectionComponent: React.FC<EditableHeaderSectionComponentProps> = ({
  section,
  onUpdate,
  isEditable = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localSection, setLocalSection] = useState(section);

  useEffect(() => {
    setLocalSection(section);
  }, [section]);

  const handleDataChange = (field: string, value: string) => {
    setLocalSection({
      ...localSection,
      data: { ...localSection.data, [field]: value }
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSection({ ...localSection, title: e.target.value });
  };

  const handleSave = () => {
    onUpdate(localSection);
    setIsEditing(false);
  };

  const renderEditMode = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Edit Header Section</h3>
      <div className="space-y-4">
        <Input
          type="text"
          value={localSection.title}
          onChange={handleTitleChange}
          className="w-full p-2 border rounded"
          placeholder="Section Title"
        />
        
        {/* News Section */}
        <div className="bg-gray-50 p-4 rounded">
          <h4 className="font-semibold mb-2">News Banner</h4>
          <Input
            type="text"
            value={localSection.data.newsTitle}
            onChange={(e) => handleDataChange('newsTitle', e.target.value)}
            className="w-full mb-2"
            placeholder="News Title"
          />
          <Textarea
            value={localSection.data.newsContent}
            onChange={(e) => handleDataChange('newsContent', e.target.value)}
            className="w-full"
            placeholder="News Content"
          />
        </div>

        {/* Main Content */}
        <div className="bg-gray-50 p-4 rounded">
          <h4 className="font-semibold mb-2">Main Content</h4>
          <Input
            type="text"
            value={localSection.data.mainTitle}
            onChange={(e) => handleDataChange('mainTitle', e.target.value)}
            className="w-full mb-2"
            placeholder="Main Title"
          />
          <Input
            type="text"
            value={localSection.data.mainSubtitle}
            onChange={(e) => handleDataChange('mainSubtitle', e.target.value)}
            className="w-full"
            placeholder="Main Subtitle"
          />
        </div>

        {/* Definition Section */}
        <div className="bg-gray-50 p-4 rounded">
          <h4 className="font-semibold mb-2">Definition Section</h4>
          <Input
            type="text"
            value={localSection.data.definitionTitle}
            onChange={(e) => handleDataChange('definitionTitle', e.target.value)}
            className="w-full mb-2"
            placeholder="Definition Title"
          />
          <Textarea
            value={localSection.data.definitionPara}
            onChange={(e) => handleDataChange('definitionPara', e.target.value)}
            className="w-full"
            placeholder="Definition Content"
          />
        </div>

        {/* Colors */}
        <div className="bg-gray-50 p-4 rounded">
          <h4 className="font-semibold mb-2">Colors</h4>
          <div className="flex gap-4">
            <Input
              type="text"
              value={localSection.data.backgroundColor}
              onChange={(e) => handleDataChange('backgroundColor', e.target.value)}
              className="w-full mb-2"
              placeholder="Background Color (e.g., bg-blue-500)"
            />
            <Input
              type="text"
              value={localSection.data.newsBannerColor}
              onChange={(e) => handleDataChange('newsBannerColor', e.target.value)}
              className="w-full mb-2"
              placeholder="News Banner Color (e.g., bg-yellow-300)"
            />
          </div>
        </div>
      </div>
      
      <Button onClick={handleSave} variant="primary" className="w-full mt-4">
        Save Changes
      </Button>
    </div>
  );

  const renderViewMode = () => (
    <div className={`rounded-lg shadow-lg overflow-hidden ${localSection.data.backgroundColor}`}>
      {/* News Banner */}
      <div className={`${localSection.data.newsBannerColor} p-4`}>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold">{localSection.data.newsTitle}</span>
          <p className="text-sm">{localSection.data.newsContent}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">{localSection.data.mainTitle}</h1>
        <p className="text-xl">{localSection.data.mainSubtitle}</p>
      </div>

      {/* Definition Box */}
      <div className="bg-white p-6 m-6 rounded-lg">
        <h3 className="text-xl font-bold mb-2">{localSection.data.definitionTitle}</h3>
        <p className="text-gray-700">{localSection.data.definitionPara}</p>
      </div>

      {isEditable && (
        <div className="p-6 bg-white border-t">
          <Button
            onClick={() => setIsEditing(true)}
            variant="secondary"
            className="w-full"
          >
            Edit Header
          </Button>
        </div>
      )}
    </div>
  );

  return isEditing ? renderEditMode() : renderViewMode();
};

export default EditableHeaderSectionComponent;