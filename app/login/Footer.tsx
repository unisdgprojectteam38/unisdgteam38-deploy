import Image from 'next/image';
import Link from 'next/link';
import UNiSDGLogo from "@/public/UNiSDG_logo.svg";
import SDG06Icon from '@/public/SDG-Grid-Logos/SDG-06.svg';

export default function Footer() {
    const sdgGoals = [
      "1 NO POVERTY",
      "2 ZERO HUNGER",
      "3 GOOD HEALTH & WELL-BEING",
      "4 QUALITY EDUCATION",
      "5 GENDER EQUALITY",
      "6 CLEAN WATER & SANITATION",
      "7 AFFORDABLE & CLEAN ENERGY",
      "8 DECENT WORK & ECONOMIC GROWTH",
      "9 INDUSTRY, INNOVATION & INFRASTRUCTURE",
      "10 REDUCED INEQUALITY",
      "11 SUSTAINABLE CITIES AND COMMUNITIES",
      "12 RESPONSIBLE CONSUMPTION AND PRODUCTION",
      "13 CLIMATE ACTION",
      "14 LIFE BELOW WATER",
      "15 LIFE ON LAND",
      "16 PEACE, JUSTICE AND STRONG INSTITUTIONS",
      "17 PARTNERSHIPS FOR THE GOALS"
    ];
    const sdgColumns = [sdgGoals.slice(0, 6), sdgGoals.slice(6, 12), sdgGoals.slice(12)];
    return (
      <footer className="bg-surface p-8 flex flex-col mb-4 h-full">
        <div className="h-60 justify-between items-start inline-flex">
          <div className="w-[140px] flex-col justify-start items-center gap-[26px] inline-flex">
            <div className="flex-col justify-start items-start gap-3 flex">
              <div className="flex-col justify-start items-start gap-2.5 flex">
              <Link href="/" className="flex items-center">
                <Image
                  src={UNiSDGLogo}
                  alt="UNiSDG Logo"
                  width={40}
                  height={40}
                  className="mr-2"
                />
            </Link>
              </div>
            <h6 className="self-stretch text-center">UNi SDG</h6>
        </div>
      </div>
        <div className="justify-start items-start gap-2 flex h-full">
          <div className="flex-col justify-start items-start gap-2 inline-flex">
            <h6 className="w-[200px] h-6">Contact Us</h6>
            <div className="h-6 flex-col justify-start items-start gap-2 flex">
                <p className="self-stretch caption text-default">@email address</p>
            </div>
            <h6 className="w-[200px] h-6">Legal</h6>
              <div className="w-[200px] flex-col justify-start items-start gap-2 inline-flex">
                <p className="self-stretch caption text-default">Terms & Conditions</p>
                <p className="self-stretch caption text-default">Privacy Policy</p>
              </div>
          </div>
      </div>
      <div className="justify-start items-start gap-4 flex h-full">
        <div className="flex-col justify-start items-start gap-2 inline-flex">
          <h6 className="w-[200px] h-6">SDG</h6>
          <div className="self-stretch h-[0px] border border-default-500"></div> {/* Horizontal line divider */}
          <div className="w-[632px] justify-start items-start gap-4 inline-flex mb-2"> 
            {sdgColumns.map((column, index) => (
              <div key={index} className="w-[200px] flex-col justify-start items-start gap-2 inline-flex">
              {column.map((goal, goalIndex) => (
                <p key={goalIndex} className="self-stretch caption text-default">{goal}</p>
                  ))}
              </div>
              ))}
          </div>
        </div>
      </div>
    </div>
    <p className="caption"> ©Copyrights All Rights Reserved</p>
  </footer>
    );
  }