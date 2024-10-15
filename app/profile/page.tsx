import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';

const ProfileSettings: React.FC = () => {
  const [profileName, setProfileName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  const supabase = createClient();

  useEffect(() => {
    const fetchProfileData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        if (error) {
          console.error('Error fetching profile:', error);
        } else {
          setProfileName(data.full_name);
          setProfilePicture(data.profile_picture);
          setBio(data.bio);
        }
      }
    };
    fetchProfileData();
  }, [supabase]);

  const handleProfileUpdate = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profileName,
          bio: bio,
        })
        .eq('id', user.id);
      if (error) {
        console.error('Error updating profile:', error);
      } else {
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white p-6 border-r border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-black">Settings</h2>
        <ul>
          <li className="mb-4 bg-blue-100 p-3 rounded-lg font-semibold flex items-center text-black">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
            Profile
          </li>
          {/* Other menu items */}
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10 bg-gray-100">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
            Profile
          </h2>
          <div className="mb-6 flex flex-col items-center">
            {!isEditing && (
              <Image
                src={profilePicture || '/placeholder-avatar.png'}
                alt="Profile"
                width={100}
                height={100}
                className="rounded-full mb-2"
              />
            )}
            <button
              className="text-blue-500 font-semibold hover:text-blue-600"
              onClick={toggleEditMode}
            >
              {isEditing ? 'Change Picture' : 'Edit Profile'}
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profileName">
              Profile Name
            </label>
            <input
              id="profileName"
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Profile Name"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={3}
              placeholder="Text"
            />
          </div>
          <button
            onClick={handleProfileUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
