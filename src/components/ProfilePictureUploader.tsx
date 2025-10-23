import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const MOCK_PHOTOS = [
    "https://i.pravatar.cc/150?img=1",
    "https://i.pravatar.cc/150?img=2",
    "https://i.pravatar.cc/150?img=3",
    "https://i.pravatar.cc/150?img=4",
    "https://i.pravatar.cc/150?img=5",
    "https://i.pravatar.cc/150?img=6",
    "https://i.pravatar.cc/150?img=7",
    "https://i.pravatar.cc/150?img=8",
    "https://i.pravatar.cc/150?img=9",
    "https://i.pravatar.cc/150?img=10",
];

interface ProfilePictureUploaderProps {
    currentPhotoUrl?: string;
    onPhotoSelect: (url: string) => void;
    name: string;
}

const ProfilePictureUploader: React.FC<ProfilePictureUploaderProps> = ({ currentPhotoUrl, onPhotoSelect, name }) => {
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    return (
        <div className="flex flex-col items-center space-y-3">
            <Avatar className="h-24 w-24 border-4 border-primary/50">
                <AvatarImage src={currentPhotoUrl} alt={`${name}'s profile picture`} />
                <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
            </Avatar>
            
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                        Change Picture
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <h4 className="font-semibold mb-2">Select Mock Avatar</h4>
                    <div className="grid grid-cols-4 gap-2">
                        {MOCK_PHOTOS.map((url, index) => (
                            <div 
                                key={index} 
                                className={cn(
                                    "cursor-pointer rounded-full p-0.5 transition-all",
                                    currentPhotoUrl === url ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-muted-foreground"
                                )}
                                onClick={() => onPhotoSelect(url)}
                            >
                                <Avatar className="h-14 w-14">
                                    <AvatarImage src={url} alt={`Avatar ${index + 1}`} />
                                    <AvatarFallback><User /></AvatarFallback>
                                </Avatar>
                            </div>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default ProfilePictureUploader;