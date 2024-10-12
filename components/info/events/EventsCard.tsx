import React from 'react';
import Image from 'next/image';


interface EventsCardProps {
    imgSrc: string;
    title: string;
    date: string;
    href?: string;
}

export const EventsCard: React.FC<EventsCardProps> = ({ imgSrc, title, date, href = "/" }) => (
    <div className="pb-6 rounded flex-col justify-start items-center gap-2 inline-flex">
        <div className="self-stretch px-4 py-1" />
                <Image
                    src={imgSrc}
                    alt="Event Image"
                    width ={336}
                    height = {340}
                    />
            <div className="self-stretch h-[82px] p-4 flex-col justify-start items-center gap-2 flex">
            <div className="self-stretch text-center text-black text-xl font-medium font-['Poppins'] leading-normal">{title}</div>
            <div className="self-stretch text-center text-black text-sm font-normal font-['Poppins'] leading-[18px]">{date}</div>
            {href && <a href={href}>Learn More</a>}
        </div>
    </div>
);

export default EventsCard;