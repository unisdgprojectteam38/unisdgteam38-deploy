import React from 'react';
import Image from 'next/image';

interface NewsCardProps{
    img: string;
    title: string;
    description: string;
    href: string;
}

export default function NewsCard({ img, title, description, href }: NewsCardProps){
    return (
        <div className="flex flex-col items-center h-full w-[280px] justify-center px-3 py-4 rounded-lg gap-5 bg-white">
            <div className="h-full">
                <Image src={img} alt="Image" width={280} height={100} />
            </div>

            <div className="flex flex-col gap-2">
                <h3 className="font-medium text-s text-center font-[Poppins]">{title}</h3>
                <p className="text-xs text-center font-[Poppins]">{description}</p>
            </div>
            <a href={href}>
                <div className="flex flex-row w-fit items-center bg-[#CCE0FF] rounded-full px-3 py-1
                hover:bg-[#85B8FF]">
                    <p className="text-black text-xs font-[Poppins] self-center text-center">Learn more</p>
                    <img
                    src="./icon_chevron-right.svg"
                    alt="right facing chevron icon"
                    />
                </div>
            </a>
        </div>
    );
}
