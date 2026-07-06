import svgPaths from "./svg-udvj3ypkkx";
import imgEllipse from "figma:asset/872b2e2bb8fd16ff43804d22e7230aa0f21f72c2.png";
import imgHeroImage from "figma:asset/a50e0a8b8ef9fafe1f423c3011370eaff3f4e66d.png";
import imgImageSarahChen from "figma:asset/c2c6b4ea97e9e7fd3560b1f789cedda98a5f5242.png";
import imgImageMarcusWebb from "figma:asset/22f529e4f8e1f09e03fb4d39c2b655f42f7c3186.png";
import imgImagePriyaNair from "figma:asset/1b7cb23acff57c13309ff6063d9d8594fe864d29.png";
import imgImageKenjiTanaka from "figma:asset/ac30fb199f6876e509b3b63469bc921fd78cbbed.png";

function Book() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Book">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Book">
          <path clipRule="evenodd" d={svgPaths.p2458a0c0} fill="var(--fill-0, black)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Frame">
      <Book />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[20px] text-black">Nice Learn</p>
    </div>
  );
}

function Frame1() {
  return <div className="flex-[1_0_0] h-px min-h-px min-w-px" data-name="Frame" />;
}

function Settings() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Settings">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_4029_6493)" id="Settings">
          <g id="Icon">
            <path clipRule="evenodd" d={svgPaths.p16bb7d80} fill="var(--fill-0, black)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p3708a980} fill="var(--fill-0, black)" fillRule="evenodd" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_4029_6493">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] py-[8px] relative rounded-[8px] shrink-0" data-name="Frame">
      <Settings />
      <p className="font-['Inter:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-black">Settings</p>
    </div>
  );
}

function Grid() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Grid">
      <div className="absolute inset-[8.33%]" data-name="Icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <g id="Icon">
            <path clipRule="evenodd" d={svgPaths.p9134480} fill="var(--fill-0, black)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p2cd85200} fill="var(--fill-0, black)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p48df580} fill="var(--fill-0, black)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p36ff3330} fill="var(--fill-0, black)" fillRule="evenodd" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0" data-name="Frame">
      <Frame3 />
      <Grid />
      <div className="relative shrink-0 size-[32px]" data-name="Ellipse">
        <img alt="" className="absolute block max-w-none size-full" height="32" src={imgEllipse} width="32" />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="col-1 content-stretch flex items-center ml-0 mt-0 overflow-clip px-[24px] py-[16px] relative row-1 w-[1440px]" data-name="Header">
      <Frame />
      <Frame1 />
      <Frame2 />
    </div>
  );
}

function HeroImage() {
  return (
    <div className="h-[240px] relative rounded-[12px] shrink-0 w-full" data-name="hero-image">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[12px]">
        <div className="absolute bg-[#e5e7eb] inset-0 rounded-[12px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[12px] size-full" src={imgHeroImage} />
      </div>
    </div>
  );
}

function Search() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Search">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_4042_2541)" id="Search">
          <path clipRule="evenodd" d={svgPaths.p3367c700} fill="var(--fill-0, #6B7280)" fillRule="evenodd" id="Icon" />
        </g>
        <defs>
          <clipPath id="clip0_4042_2541">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BtnSearch() {
  return (
    <div className="bg-white relative rounded-[14px] shrink-0 size-[34px]" data-name="btn-search">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <Search />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_4042_2577)" id="Icon">
          <path d={svgPaths.p1ce3c700} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2468000} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2d94c080} id="Vector_3" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pbbb480} id="Vector_4" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_4042_2577">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white h-[34px] relative rounded-[14px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col h-full items-start pb-px pt-[9px] px-[9px] relative">
        <Icon />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_12.5%_66.67%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33333 5.33333">
            <path d={svgPaths.p36446d40} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_62.5%_37.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33333 5.33333">
            <path d={svgPaths.p36446d40} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.67%_12.5%_8.33%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33333 5.33333">
            <path d={svgPaths.p36446d40} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[56.29%_35.75%_27.12%_35.79%]" data-name="Vector">
        <div className="absolute inset-[-25.13%_-14.64%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.88688 3.98688">
            <path d={svgPaths.p3e007700} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[27.13%_35.79%_56.29%_35.79%]" data-name="Vector">
        <div className="absolute inset-[-25.13%_-14.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.88022 3.98688">
            <path d={svgPaths.p309e7540} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white relative rounded-[14px] shrink-0 size-[34px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pt-[9px] px-[9px] relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[20px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3694d280} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M12.6667 5.33333V9.33333" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14.6667 7.33333H10.6667" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#13c1ac] flex-[1_0_0] h-[36px] min-h-px min-w-px relative rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon2 />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] leading-[20px] left-[80.5px] not-italic text-[14px] text-center text-white top-[8.5px] tracking-[-0.1504px]">{` Join Group`}</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[8px] h-[40px] items-center relative shrink-0 w-[219.93px]" data-name="Container">
      <Button />
      <Button1 />
      <Button2 />
    </div>
  );
}

function Actions() {
  return (
    <div className="absolute content-stretch flex gap-[12px] items-start justify-end left-[1056px] overflow-clip top-[290px]" data-name="actions">
      <BtnSearch />
      <Container />
    </div>
  );
}

function GroupCard() {
  return (
    <div className="bg-white relative rounded-[16px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] shrink-0 w-full" data-name="group-card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[16px] relative w-full">
          <HeroImage />
          <Actions />
        </div>
      </div>
    </div>
  );
}

function StatusTag() {
  return (
    <div className="bg-[#fee2e2] relative rounded-[999px] shrink-0" data-name="status-tag">
      <div className="content-stretch flex items-center overflow-clip px-[10px] py-[6px] relative rounded-[inherit]">
        <p className="font-['Inter:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#b91c1c] text-[12px]">Filling Fast</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#fca5a5] border-solid inset-0 pointer-events-none rounded-[999px]" />
    </div>
  );
}

function Divider() {
  return <div className="bg-[#e5e7eb] h-px shrink-0 w-full" data-name="divider" />;
}

function Calendar() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Calendar">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_4042_586)" id="Calendar">
          <g id="Icon">
            <path d={svgPaths.p5ebf600} fill="var(--fill-0, #6B7280)" />
            <path d={svgPaths.p272efe00} fill="var(--fill-0, #6B7280)" />
            <path d={svgPaths.p245a4570} fill="var(--fill-0, #6B7280)" />
            <path d={svgPaths.p34db08f1} fill="var(--fill-0, #6B7280)" />
            <path d={svgPaths.p1a6ef00} fill="var(--fill-0, #6B7280)" />
            <path d={svgPaths.pb3f8d80} fill="var(--fill-0, #6B7280)" />
            <path d={svgPaths.p2e9c0880} fill="var(--fill-0, #6B7280)" />
            <path clipRule="evenodd" d={svgPaths.p1a9d5500} fill="var(--fill-0, #6B7280)" fillRule="evenodd" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_4042_586">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function RowSchedule() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-[364px]" data-name="row-schedule">
      <Calendar />
      <p className="font-['Inter:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#374151] text-[13px]">Every Tuesday @ 7:00 PM (GMT+1)</p>
    </div>
  );
}

function Clock() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Clock">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_4042_592)" id="Clock">
          <path clipRule="evenodd" d={svgPaths.p1857c600} fill="var(--fill-0, #6B7280)" fillRule="evenodd" id="Icon" />
        </g>
        <defs>
          <clipPath id="clip0_4042_592">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function RowNext() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-[364px]" data-name="row-next">
      <Clock />
      <p className="font-['Inter:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#374151] text-[13px]">Next Meeting: Feb 24th (Module 3: Prototyping)</p>
    </div>
  );
}

function Clock1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Clock">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_4042_592)" id="Clock">
          <path clipRule="evenodd" d={svgPaths.p1857c600} fill="var(--fill-0, #6B7280)" fillRule="evenodd" id="Icon" />
        </g>
        <defs>
          <clipPath id="clip0_4042_592">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function RowCommitment() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-[364px]" data-name="row-commitment">
      <Clock1 />
      <p className="font-['Inter:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#374151] text-[13px]">Commitment: 1.5 hour/week</p>
    </div>
  );
}

function Search1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Search">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_4042_2541)" id="Search">
          <path clipRule="evenodd" d={svgPaths.p3367c700} fill="var(--fill-0, #6B7280)" fillRule="evenodd" id="Icon" />
        </g>
        <defs>
          <clipPath id="clip0_4042_2541">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BtnSearch1() {
  return (
    <div className="bg-white relative rounded-[14px] shrink-0 size-[34px]" data-name="btn-search">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <Search1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_4042_2577)" id="Icon">
          <path d={svgPaths.p1ce3c700} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2468000} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2d94c080} id="Vector_3" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pbbb480} id="Vector_4" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_4042_2577">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white h-[34px] relative rounded-[14px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col h-full items-start pb-px pt-[9px] px-[9px] relative">
        <Icon3 />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_12.5%_66.67%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33333 5.33333">
            <path d={svgPaths.p36446d40} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_62.5%_37.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33333 5.33333">
            <path d={svgPaths.p36446d40} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.67%_12.5%_8.33%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33333 5.33333">
            <path d={svgPaths.p36446d40} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[56.29%_35.75%_27.12%_35.79%]" data-name="Vector">
        <div className="absolute inset-[-25.13%_-14.64%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.88688 3.98688">
            <path d={svgPaths.p3e007700} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[27.13%_35.79%_56.29%_35.79%]" data-name="Vector">
        <div className="absolute inset-[-25.13%_-14.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.88022 3.98688">
            <path d={svgPaths.p309e7540} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white relative rounded-[14px] shrink-0 size-[34px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pt-[9px] px-[9px] relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[20px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3694d280} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M12.6667 5.33333V9.33333" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14.6667 7.33333H10.6667" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#13c1ac] flex-[1_0_0] h-[36px] min-h-px min-w-px relative rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon5 />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] leading-[20px] left-[80.5px] not-italic text-[14px] text-center text-white top-[8.5px] tracking-[-0.1504px]">{` Join Group`}</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[40px] items-center relative shrink-0 w-[219.93px]" data-name="Container">
      <Button3 />
      <Button4 />
      <Button5 />
    </div>
  );
}

function Actions1() {
  return (
    <div className="absolute content-stretch flex gap-[12px] items-start justify-end left-[1056px] overflow-clip top-[290px]" data-name="actions">
      <BtnSearch1 />
      <Container1 />
    </div>
  );
}

function ImageSarahChen() {
  return (
    <div className="absolute left-0 rounded-[16777200px] size-[20px] top-0" data-name="Image (Sarah Chen)">
      <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[16777200px] size-full" src={imgImageSarahChen} />
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 rounded-[16777200px]" />
    </div>
  );
}

function ImageMarcusWebb() {
  return (
    <div className="absolute left-[14px] rounded-[16777200px] size-[20px] top-0" data-name="Image (Marcus Webb)">
      <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[16777200px] size-full" src={imgImageMarcusWebb} />
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 rounded-[16777200px]" />
    </div>
  );
}

function ImagePriyaNair() {
  return (
    <div className="absolute left-[28px] rounded-[16777200px] size-[20px] top-0" data-name="Image (Priya Nair)">
      <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[16777200px] size-full" src={imgImagePriyaNair} />
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 rounded-[16777200px]" />
    </div>
  );
}

function ImageKenjiTanaka() {
  return (
    <div className="absolute left-[42px] rounded-[16777200px] size-[20px] top-0" data-name="Image (Kenji Tanaka)">
      <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[16777200px] size-full" src={imgImageKenjiTanaka} />
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 rounded-[16777200px]" />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[62px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid pointer-events-none relative size-full">
        <ImageSarahChen />
        <ImageMarcusWebb />
        <ImagePriyaNair />
        <ImageKenjiTanaka />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] leading-[normal] left-0 not-italic text-[#374151] text-[13px] top-[0.5px]">4 of 8 seats taken</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex gap-[6px] h-[20px] items-center left-0 top-0 w-[169.313px]" data-name="Container">
      <Container4 />
      <Text />
    </div>
  );
}

function Text1() {
  return <div className="absolute bg-[#d1d5dc] left-[185.31px] rounded-[16777200px] size-[4px] top-[8px]" data-name="Text" />;
}

function Text2() {
  return <div className="absolute bg-[#d1d5dc] left-[347.26px] rounded-[16777200px] size-[4px] top-[8px]" data-name="Text" />;
}

function Container2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Container3 />
      <Text1 />
      <Text2 />
    </div>
  );
}

function Members() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="members">
      <Container2 />
    </div>
  );
}

function GroupCard1() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="group-card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start px-[120px] py-[16px] relative w-full">
          <StatusTag />
          <p className="font-['Inter:Bold',sans-serif] leading-[1.2] min-w-full not-italic relative shrink-0 text-[#111827] text-[24px] w-[min-content] whitespace-pre-wrap">Advanced Figma Make Mastery Group</p>
          <p className="font-['Inter:Regular',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[#6b7280] text-[13px] w-[min-content] whitespace-pre-wrap">{`Part of the "Google UX Design Professional Certificate"`}</p>
          <Divider />
          <RowSchedule />
          <RowNext />
          <RowCommitment />
          <Actions1 />
          <Members />
        </div>
      </div>
    </div>
  );
}

function BookOpen() {
  return (
    <div className="absolute left-[16px] size-[16px] top-[14px]" data-name="BookOpen">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="BookOpen">
          <path d="M8 4.66667V14" id="Vector" stroke="var(--stroke-0, #7008E7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p8c8fb00} id="Vector_2" stroke="var(--stroke-0, #7008E7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[46px] relative shrink-0 w-[109.805px]" data-name="button">
      <div aria-hidden="true" className="absolute border-[#7f22fe] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <BookOpen />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] leading-[20px] left-[66px] not-italic text-[#7008e7] text-[14px] text-center top-[12.5px] tracking-[-0.1504px]">Syllabus</p>
      </div>
    </div>
  );
}

function Users() {
  return (
    <div className="absolute left-[16px] size-[16px] top-[14px]" data-name="Users">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Users">
          <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3694d280} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1f197700} id="Vector_3" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3bf3e100} id="Vector_4" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Span() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20px] left-[105.81px] rounded-[16777200px] top-[12px] w-[19.828px]" data-name="span">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[10px] not-italic text-[#6a7282] text-[12px] text-center top-[3px]">6</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="h-[46px] relative shrink-0 w-[141.641px]" data-name="button">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Users />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] leading-[20px] left-[69.5px] not-italic text-[#6a7282] text-[14px] text-center top-[12.5px] tracking-[-0.1504px]">Members</p>
        <Span />
      </div>
    </div>
  );
}

function FolderOpen() {
  return (
    <div className="absolute left-[16px] size-[16px] top-[14px]" data-name="FolderOpen">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="FolderOpen">
          <path d={svgPaths.p1975cc00} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Span1() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20px] left-[98.26px] rounded-[16777200px] top-[12px] w-[19.898px]" data-name="span">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[10px] not-italic text-[#6a7282] text-[12px] text-center top-[3px]">4</p>
    </div>
  );
}

function Button8() {
  return (
    <div className="h-[46px] relative shrink-0 w-[134.156px]" data-name="button">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <FolderOpen />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] leading-[20px] left-[65px] not-italic text-[#6a7282] text-[14px] text-center top-[12.5px] tracking-[-0.1504px]">Projects</p>
        <Span1 />
      </div>
    </div>
  );
}

function Calendar1() {
  return (
    <div className="absolute left-[16px] size-[16px] top-[14px]" data-name="Calendar">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Calendar">
          <path d="M5.33333 1.33333V4" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 1.33333V4" id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3ee34580} id="Vector_3" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 6.66667H14" id="Vector_4" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Span2() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20px] left-[105.02px] rounded-[16777200px] top-[12px] w-[19.695px]" data-name="span">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[10px] not-italic text-[#6a7282] text-[12px] text-center top-[3px]">3</p>
    </div>
  );
}

function Button9() {
  return (
    <div className="h-[46px] relative shrink-0 w-[140.719px]" data-name="button">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Calendar1 />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] leading-[20px] left-[69px] not-italic text-[#6a7282] text-[14px] text-center top-[12.5px] tracking-[-0.1504px]">Meetings</p>
        <Span2 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[48px] relative shrink-0 w-[1104px]" data-name="Container">
      <div className="content-stretch flex gap-[4px] items-center overflow-clip pb-px relative rounded-[inherit] size-full">
        <Button6 />
        <Button7 />
        <Button8 />
        <Button9 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pd2ce200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M18.3333 8.33333V13.3333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1ead9c00} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] relative rounded-[14px] shrink-0 size-[36px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] leading-[16px] left-0 not-italic text-[16px] text-white top-[-0.5px] tracking-[-0.3125px]">Figma Make Mastery</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.6)] top-px">Zero to Hero · 10 Steps · ~18–20 hrs self-paced</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="flex-[1_0_0] h-[34px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Paragraph />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[36px] items-center left-0 top-0 w-[316.875px]" data-name="Container">
      <Container11 />
      <Container12 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p33035500} id="Vector" stroke="var(--stroke-0, #FFD230)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] left-0 not-italic text-[0px] text-[12px] text-white top-px">
          <span className="leading-[16px]">350</span>
          <span className="font-['Inter:Regular',sans-serif] leading-[16px] text-[rgba(255,255,255,0.5)]">{` / 1700 XP`}</span>
        </p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.1)] content-stretch flex gap-[6px] h-[30px] items-center left-0 px-[13px] py-px rounded-[16777200px] top-0 w-[126.539px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
      <Icon7 />
      <Text3 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_4042_2533)" id="Icon">
          <path d={svgPaths.p3f585180} id="Vector" stroke="var(--stroke-0, #FFD230)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p375f9900} id="Vector_2" stroke="var(--stroke-0, #FFD230)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M2.33333 12.8333H11.6667" id="Vector_3" stroke="var(--stroke-0, #FFD230)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p13967000} id="Vector_4" stroke="var(--stroke-0, #FFD230)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p6d8f80} id="Vector_5" stroke="var(--stroke-0, #FFD230)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p1e3f2340} id="Vector_6" stroke="var(--stroke-0, #FFD230)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_4042_2533">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] left-0 not-italic text-[0px] text-[12px] text-white top-px">
          <span className="leading-[16px]">3</span>
          <span className="font-['Inter:Regular',sans-serif] leading-[16px] text-[rgba(255,255,255,0.5)]">{` / 10 steps done`}</span>
        </p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.1)] content-stretch flex gap-[6px] h-[30px] items-center left-[136.54px] px-[13px] py-px rounded-[16777200px] top-0 w-[143.414px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
      <Icon8 />
      <Text4 />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute h-[30px] left-[878.05px] top-[3px] w-[279.953px]" data-name="Container">
      <Container14 />
      <Container15 />
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container13 />
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[16px] relative shrink-0 w-[93.141px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.7)] top-px">Overall Progress</p>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[16px] relative shrink-0 w-[27.813px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-0 not-italic text-[12px] text-white top-px">30%</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex h-[16px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text5 />
      <Text6 />
    </div>
  );
}

function Container19() {
  return <div className="bg-white h-[8px] rounded-[16777200px] shrink-0 w-full" data-name="Container" />;
}

function Container18() {
  return (
    <div className="bg-[rgba(255,255,255,0.2)] h-[8px] relative rounded-[16777200px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pr-[727.305px] relative size-full">
          <Container19 />
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[30px] items-start relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Container18 />
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-gradient-to-r from-[#13c1ac] h-[114px] relative shrink-0 to-[#0f9a8f] w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[16px] items-start pt-[16px] px-[20px] relative size-full">
        <Container9 />
        <Container16 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-white h-[116px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <Container8 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_4042_2526)" id="Icon">
          <path d={svgPaths.p24941500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M16.6667 2.5V5.83333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M18.3333 4.16667H15" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M3.33333 14.1667V15.8333" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M4.16667 15H2.5" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_4042_2526">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container21() {
  return (
    <div className="relative rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 size-[40px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(19, 193, 172) 0%, rgb(15, 154, 143) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon9 />
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="bg-[#f4fcfb] h-[22px] relative rounded-[16777200px] shrink-0 w-[45.891px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[#d1e8e4] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[9px] not-italic text-[#13c1ac] text-[12px] top-[4px]">Intro</p>
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[16px] relative shrink-0 w-[57.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-px">Start here</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex gap-[8px] h-[22px] items-center relative shrink-0 w-full" data-name="Container">
      <Text7 />
      <Text8 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-[0.5px] tracking-[-0.1504px]">{`Course Introduction & Getting Started`}</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] top-px">{`How this learning hub works, what you'll build, and what to expect`}</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="flex-[1_0_0] h-[62px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Container23 />
        <Paragraph2 />
        <Paragraph3 />
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 5.33333">
            <path d={svgPaths.p32098840} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon10 />
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="h-[94px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[20px] relative size-full">
          <Container21 />
          <Container22 />
          <Container24 />
        </div>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-white h-[96px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <Button10 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute h-[16px] left-0 top-[3px] w-[21.344px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-px">S01</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute bg-[#ecfdf5] border border-[#a4f4cf] border-solid h-[22px] left-[27.34px] rounded-[16777200px] top-0 w-[69.703px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[8px] not-italic text-[#007a55] text-[12px] top-[3px]">Beginner</p>
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute bg-[#ecfdf5] border border-[#a4f4cf] border-solid h-[22px] left-[103.05px] rounded-[16777200px] top-0 w-[62.016px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[8px] not-italic text-[#096] text-[12px] top-[3px]">✓ Done</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute h-[22px] left-0 top-0 w-[879.227px]" data-name="Container">
      <Text9 />
      <Text10 />
      <Text11 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[19.25px] left-0 overflow-clip top-[26px] w-[879.227px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[19.25px] left-0 not-italic text-[#101828] text-[14px] top-0 tracking-[-0.1504px]">What is Figma Make? — The Big Picture</p>
    </div>
  );
}

function Container30() {
  return <div className="bg-[#13c1ac] h-[4px] rounded-[16777200px] shrink-0 w-full" data-name="Container" />;
}

function Container29() {
  return (
    <div className="bg-[#f3f4f6] flex-[1_0_0] h-[4px] min-h-px min-w-px relative rounded-[16777200px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Container30 />
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[16px] relative shrink-0 w-[34.719px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-px">100%</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[16px] items-center left-0 top-[51px] w-[950px]" data-name="Container">
      <Container29 />
      <Text12 />
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute h-[67.25px] left-[76px] top-[16px] w-[879.227px]" data-name="Container">
      <Container27 />
      <Paragraph4 />
      <Container28 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_4042_2561)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_4042_2561">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[16px] relative shrink-0 w-[55.773px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon11 />
        <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-px">45 min</p>
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_4042_2521)" id="Icon">
          <path d={svgPaths.p216a6c0} id="Vector" stroke="var(--stroke-0, #FE9A00)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_4042_2521">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text14() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[54.719px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon12 />
        <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[14px] not-italic text-[#fe9a00] text-[12px] top-px">100 XP</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="flex-[1_0_0] h-[34px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-end relative size-full">
        <Text13 />
        <Text14 />
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 5.33333">
            <path d={svgPaths.p32098840} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon13 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[34px] items-center left-[1090.23px] top-[32.63px] w-[87.773px]" data-name="Container">
      <Container32 />
      <Container33 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative size-[40px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Icon">
          <path d={svgPaths.p22fc4900} id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeWidth="3" />
          <path d={svgPaths.p22fc4900} id="Vector_2" stroke="var(--stroke-0, #10B981)" strokeDasharray="106.81 106.81" strokeLinecap="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p3de7e600} id="Vector" stroke="var(--stroke-0, #00BC7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 size-[40px] top-0" data-name="Container">
      <Icon15 />
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute left-[20px] size-[40px] top-[29.63px]" data-name="Container">
      <div className="absolute flex items-center justify-center left-0 size-[40px] top-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <Icon14 />
        </div>
      </div>
      <Container35 />
    </div>
  );
}

function Button11() {
  return (
    <div className="h-[99.25px] relative shrink-0 w-full" data-name="Button">
      <Container26 />
      <Container31 />
      <Container34 />
    </div>
  );
}

function Container25() {
  return (
    <div className="bg-white h-[101.25px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <Button11 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text15() {
  return (
    <div className="absolute h-[16px] left-0 top-[3px] w-[22.984px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-px">S02</p>
    </div>
  );
}

function Text16() {
  return (
    <div className="absolute bg-[#ecfdf5] border border-[#a4f4cf] border-solid h-[22px] left-[28.98px] rounded-[16777200px] top-0 w-[69.703px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[8px] not-italic text-[#007a55] text-[12px] top-[3px]">Beginner</p>
    </div>
  );
}

function Text17() {
  return (
    <div className="absolute bg-[#ecfdf5] border border-[#a4f4cf] border-solid h-[22px] left-[104.69px] rounded-[16777200px] top-0 w-[62.016px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[8px] not-italic text-[#096] text-[12px] top-[3px]">✓ Done</p>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute h-[22px] left-0 top-0 w-[880.281px]" data-name="Container">
      <Text15 />
      <Text16 />
      <Text17 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute h-[19.25px] left-0 overflow-clip top-[26px] w-[880.281px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[19.25px] left-0 not-italic text-[#101828] text-[14px] top-0 tracking-[-0.1504px]">Setting Up Your Figma Make Workspace</p>
    </div>
  );
}

function Container41() {
  return <div className="bg-[#13c1ac] h-[4px] rounded-[16777200px] shrink-0 w-full" data-name="Container" />;
}

function Container40() {
  return (
    <div className="bg-[#f3f4f6] flex-[1_0_0] h-[4px] min-h-px min-w-px relative rounded-[16777200px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Container41 />
      </div>
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[16px] relative shrink-0 w-[34.719px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-px">100%</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[16px] items-center left-0 top-[51px] w-[950px]" data-name="Container">
      <Container40 />
      <Text18 />
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute h-[68px] left-[76px] top-[15.75px] w-[950px]" data-name="Container">
      <Container38 />
      <Paragraph5 />
      <Container39 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_4042_2561)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_4042_2561">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[16px] relative shrink-0 w-[51.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon16 />
        <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-px">1 hour</p>
      </div>
    </div>
  );
}

function Icon17() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_4042_2521)" id="Icon">
          <path d={svgPaths.p216a6c0} id="Vector" stroke="var(--stroke-0, #FE9A00)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_4042_2521">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text20() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[54.719px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon17 />
        <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[14px] not-italic text-[#fe9a00] text-[12px] top-px">100 XP</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="flex-[1_0_0] h-[34px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-end relative size-full">
        <Text19 />
        <Text20 />
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 5.33333">
            <path d={svgPaths.p32098840} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon18 />
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[34px] items-center left-[1091.28px] top-[32.63px] w-[86.719px]" data-name="Container">
      <Container43 />
      <Container44 />
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative size-[40px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Icon">
          <path d={svgPaths.p22fc4900} id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeWidth="3" />
          <path d={svgPaths.p22fc4900} id="Vector_2" stroke="var(--stroke-0, #10B981)" strokeDasharray="106.81 106.81" strokeLinecap="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p3de7e600} id="Vector" stroke="var(--stroke-0, #00BC7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 size-[40px] top-0" data-name="Container">
      <Icon20 />
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute left-[20px] size-[40px] top-[29.63px]" data-name="Container">
      <div className="absolute flex items-center justify-center left-0 size-[40px] top-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <Icon19 />
        </div>
      </div>
      <Container46 />
    </div>
  );
}

function Button12() {
  return (
    <div className="h-[99.25px] relative shrink-0 w-full" data-name="Button">
      <Container37 />
      <Container42 />
      <Container45 />
    </div>
  );
}

function Container36() {
  return (
    <div className="bg-white h-[101.25px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <Button12 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text21() {
  return (
    <div className="absolute h-[16px] left-0 top-[3px] w-[23.25px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-px">S03</p>
    </div>
  );
}

function Text22() {
  return (
    <div className="absolute bg-[#ecfdf5] border border-[#a4f4cf] border-solid h-[22px] left-[29.25px] rounded-[16777200px] top-0 w-[69.703px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[8px] not-italic text-[#007a55] text-[12px] top-[3px]">Beginner</p>
    </div>
  );
}

function Text23() {
  return (
    <div className="absolute bg-[#ecfdf5] border border-[#a4f4cf] border-solid h-[22px] left-[104.95px] rounded-[16777200px] top-0 w-[62.016px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[8px] not-italic text-[#096] text-[12px] top-[3px]">✓ Done</p>
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute h-[22px] left-0 top-0 w-[866.531px]" data-name="Container">
      <Text21 />
      <Text22 />
      <Text23 />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="absolute h-[19.25px] left-0 overflow-clip top-[26px] w-[866.531px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[19.25px] left-0 not-italic text-[#101828] text-[14px] top-0 tracking-[-0.1504px]">The Art of Prompting Figma Make</p>
    </div>
  );
}

function Container52() {
  return <div className="bg-[#13c1ac] h-[4px] rounded-[16777200px] shrink-0 w-full" data-name="Container" />;
}

function Container51() {
  return (
    <div className="bg-[#f3f4f6] flex-[1_0_0] h-[4px] min-h-px min-w-px relative rounded-[16777200px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Container52 />
      </div>
    </div>
  );
}

function Text24() {
  return (
    <div className="h-[16px] relative shrink-0 w-[34.719px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-px">100%</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[16px] items-center left-0 top-[51px] w-[950px]" data-name="Container">
      <Container51 />
      <Text24 />
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute h-[67px] left-[76px] top-[16.5px] w-[950px]" data-name="Container">
      <Container49 />
      <Paragraph6 />
      <Container50 />
    </div>
  );
}

function Icon21() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_4042_2561)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_4042_2561">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text25() {
  return (
    <div className="h-[16px] relative shrink-0 w-[68.469px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon21 />
        <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-px">1.5 hours</p>
      </div>
    </div>
  );
}

function Icon22() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_4042_2521)" id="Icon">
          <path d={svgPaths.p216a6c0} id="Vector" stroke="var(--stroke-0, #FE9A00)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_4042_2521">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text26() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[54.547px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon22 />
        <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[14px] not-italic text-[#fe9a00] text-[12px] top-px">150 XP</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="flex-[1_0_0] h-[34px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-end relative size-full">
        <Text25 />
        <Text26 />
      </div>
    </div>
  );
}

function Icon23() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 5.33333">
            <path d={svgPaths.p32098840} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon23 />
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[34px] items-center left-[1077.53px] top-[32.63px] w-[100.469px]" data-name="Container">
      <Container54 />
      <Container55 />
    </div>
  );
}

function Icon24() {
  return (
    <div className="relative size-[40px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Icon">
          <path d={svgPaths.p22fc4900} id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeWidth="3" />
          <path d={svgPaths.p22fc4900} id="Vector_2" stroke="var(--stroke-0, #10B981)" strokeDasharray="106.81 106.81" strokeLinecap="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Icon25() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p3de7e600} id="Vector" stroke="var(--stroke-0, #00BC7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container57() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 size-[40px] top-0" data-name="Container">
      <Icon25 />
    </div>
  );
}

function Container56() {
  return (
    <div className="absolute left-[20px] size-[40px] top-[29.63px]" data-name="Container">
      <div className="absolute flex items-center justify-center left-0 size-[40px] top-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <Icon24 />
        </div>
      </div>
      <Container57 />
    </div>
  );
}

function Button13() {
  return (
    <div className="h-[99.25px] relative shrink-0 w-full" data-name="Button">
      <Container48 />
      <Container53 />
      <Container56 />
    </div>
  );
}

function Container47() {
  return (
    <div className="bg-white h-[101.25px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <Button13 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text27() {
  return (
    <div className="absolute h-[16px] left-0 top-[3px] w-[23.484px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-px">S04</p>
    </div>
  );
}

function Text28() {
  return (
    <div className="absolute bg-[#eff6ff] border border-[#bedbff] border-solid h-[22px] left-[29.48px] rounded-[16777200px] top-0 w-[91.469px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[8px] not-italic text-[#1447e6] text-[12px] top-[3px]">Intermediate</p>
    </div>
  );
}

function Text29() {
  return (
    <div className="absolute bg-[#fffbeb] border border-[#fee685] border-solid h-[22px] left-[126.95px] rounded-[16777200px] top-0 w-[83.32px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[8px] not-italic text-[#e17100] text-[12px] top-[3px]">In Progress</p>
    </div>
  );
}

function Container60() {
  return (
    <div className="absolute h-[22px] left-0 top-0 w-[875.586px]" data-name="Container">
      <Text27 />
      <Text28 />
      <Text29 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="absolute h-[19.25px] left-0 overflow-clip top-[26px] w-[875.586px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[19.25px] left-0 not-italic text-[#101828] text-[14px] top-0 tracking-[-0.1504px]">From Figma Design to Make — Connecting Your Design System</p>
    </div>
  );
}

function Container63() {
  return <div className="bg-[#13c1ac] h-[4px] rounded-[16777200px] shrink-0 w-full" data-name="Container" />;
}

function Container62() {
  return (
    <div className="bg-[#f3f4f6] flex-[1_0_0] h-[4px] min-h-px min-w-px relative rounded-[16777200px]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[848.313px] relative size-full">
          <Container63 />
        </div>
      </div>
    </div>
  );
}

function Text30() {
  return (
    <div className="h-[16px] relative shrink-0 w-[19.273px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-px">0%</p>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[16px] items-center left-0 top-[51.25px] w-[950px]" data-name="Container">
      <Container62 />
      <Text30 />
    </div>
  );
}

function Container59() {
  return (
    <div className="absolute h-[67.25px] left-[76px] top-[16px] w-[875.586px]" data-name="Container">
      <Container60 />
      <Paragraph7 />
      <Container61 />
    </div>
  );
}

function Icon26() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_4042_2561)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_4042_2561">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text31() {
  return (
    <div className="h-[16px] relative shrink-0 w-[59.414px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon26 />
        <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-px">2 hours</p>
      </div>
    </div>
  );
}

function Icon27() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_4042_2521)" id="Icon">
          <path d={svgPaths.p216a6c0} id="Vector" stroke="var(--stroke-0, #FE9A00)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_4042_2521">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text32() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[54.547px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon27 />
        <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[14px] not-italic text-[#fe9a00] text-[12px] top-px">150 XP</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="flex-[1_0_0] h-[34px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-end relative size-full">
        <Text31 />
        <Text32 />
      </div>
    </div>
  );
}

function Icon28() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 5.33333">
            <path d={svgPaths.p32098840} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon28 />
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[34px] items-center left-[1086.59px] top-[32.63px] w-[91.414px]" data-name="Container">
      <Container65 />
      <Container66 />
    </div>
  );
}

function Icon29() {
  return (
    <div className="relative size-[40px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Icon">
          <path d={svgPaths.p22fc4900} id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeWidth="3" />
          <path d={svgPaths.p22fc4900} id="Vector_2" stroke="var(--stroke-0, #6366F1)" strokeLinecap="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Text33() {
  return (
    <div className="h-[16px] relative shrink-0 w-[7.898px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#4a5565] text-[12px] top-px">4</p>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 pr-[0.008px] size-[40px] top-0" data-name="Container">
      <Text33 />
    </div>
  );
}

function Container67() {
  return (
    <div className="absolute left-[20px] size-[40px] top-[29.63px]" data-name="Container">
      <div className="absolute flex items-center justify-center left-0 size-[40px] top-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <Icon29 />
        </div>
      </div>
      <Container68 />
    </div>
  );
}

function Button14() {
  return (
    <div className="h-[99.25px] relative shrink-0 w-full" data-name="Button">
      <Container59 />
      <Container64 />
      <Container67 />
    </div>
  );
}

function Container58() {
  return (
    <div className="bg-white h-[101.25px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <Button14 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text34() {
  return (
    <div className="absolute h-[16px] left-0 top-[3px] w-[23.18px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-px">S05</p>
    </div>
  );
}

function Text35() {
  return (
    <div className="absolute bg-[#eff6ff] border border-[#bedbff] border-solid h-[22px] left-[29.18px] rounded-[16777200px] top-0 w-[91.469px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[8px] not-italic text-[#1447e6] text-[12px] top-[3px]">Intermediate</p>
    </div>
  );
}

function Text36() {
  return (
    <div className="absolute bg-[#f9fafb] border border-[#e5e7eb] border-solid h-[22px] left-[126.65px] rounded-[16777200px] top-0 w-[59.578px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[8px] not-italic text-[#99a1af] text-[12px] top-[3px]">Locked</p>
    </div>
  );
}

function Container71() {
  return (
    <div className="absolute h-[22px] left-0 top-0 w-[875.586px]" data-name="Container">
      <Text34 />
      <Text35 />
      <Text36 />
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="absolute h-[19.25px] left-0 overflow-clip top-[26px] w-[875.586px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[19.25px] left-0 not-italic text-[#101828] text-[14px] top-0 tracking-[-0.1504px]">Multi-Screen Flows and Navigation Architecture</p>
    </div>
  );
}

function Container74() {
  return <div className="bg-[#13c1ac] h-[4px] rounded-[16777200px] shrink-0 w-full" data-name="Container" />;
}

function Container73() {
  return (
    <div className="bg-[#f3f4f6] flex-[1_0_0] h-[4px] min-h-px min-w-px relative rounded-[16777200px]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[848.313px] relative size-full">
          <Container74 />
        </div>
      </div>
    </div>
  );
}

function Text37() {
  return (
    <div className="h-[16px] relative shrink-0 w-[19.273px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-px">0%</p>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[16px] items-center left-0 top-[51px] w-[950px]" data-name="Container">
      <Container73 />
      <Text37 />
    </div>
  );
}

function Container70() {
  return (
    <div className="absolute h-[67px] left-[76px] top-[16px] w-[950px]" data-name="Container">
      <Container71 />
      <Paragraph8 />
      <Container72 />
    </div>
  );
}

function Icon30() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_4042_2561)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_4042_2561">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text38() {
  return (
    <div className="h-[16px] relative shrink-0 w-[59.414px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon30 />
        <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-px">2 hours</p>
      </div>
    </div>
  );
}

function Icon31() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_4042_2521)" id="Icon">
          <path d={svgPaths.p216a6c0} id="Vector" stroke="var(--stroke-0, #FE9A00)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_4042_2521">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text39() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[56.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon31 />
        <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[14px] not-italic text-[#fe9a00] text-[12px] top-px">200 XP</p>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="flex-[1_0_0] h-[34px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-end relative size-full">
        <Text38 />
        <Text39 />
      </div>
    </div>
  );
}

function Icon32() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 5.33333">
            <path d={svgPaths.p32098840} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon32 />
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[34px] items-center left-[1086.59px] top-[32.63px] w-[91.414px]" data-name="Container">
      <Container76 />
      <Container77 />
    </div>
  );
}

function Icon33() {
  return (
    <div className="relative size-[40px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Icon">
          <path d={svgPaths.p22fc4900} id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeWidth="3" />
          <path d={svgPaths.p22fc4900} id="Vector_2" stroke="var(--stroke-0, #6366F1)" strokeLinecap="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Icon34() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2b283480} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.pbc77700} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container79() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 size-[40px] top-0" data-name="Container">
      <Icon34 />
    </div>
  );
}

function Container78() {
  return (
    <div className="absolute left-[20px] size-[40px] top-[29.63px]" data-name="Container">
      <div className="absolute flex items-center justify-center left-0 size-[40px] top-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <Icon33 />
        </div>
      </div>
      <Container79 />
    </div>
  );
}

function Button15() {
  return (
    <div className="h-[99.25px] relative shrink-0 w-full" data-name="Button">
      <Container70 />
      <Container75 />
      <Container78 />
    </div>
  );
}

function Container69() {
  return (
    <div className="bg-white h-[101.25px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <Button15 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text40() {
  return (
    <div className="absolute h-[16px] left-0 top-[3px] w-[23.414px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-px">S06</p>
    </div>
  );
}

function Text41() {
  return (
    <div className="absolute bg-[#eff6ff] border border-[#bedbff] border-solid h-[22px] left-[29.41px] rounded-[16777200px] top-0 w-[91.469px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[8px] not-italic text-[#1447e6] text-[12px] top-[3px]">Intermediate</p>
    </div>
  );
}

function Text42() {
  return (
    <div className="absolute bg-[#f9fafb] border border-[#e5e7eb] border-solid h-[22px] left-[126.88px] rounded-[16777200px] top-0 w-[59.578px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[8px] not-italic text-[#99a1af] text-[12px] top-[3px]">Locked</p>
    </div>
  );
}

function Container82() {
  return (
    <div className="absolute h-[22px] left-0 top-0 w-[864.734px]" data-name="Container">
      <Text40 />
      <Text41 />
      <Text42 />
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="absolute h-[19.25px] left-0 overflow-clip top-[26px] w-[864.734px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[19.25px] left-0 not-italic text-[#101828] text-[14px] top-0 tracking-[-0.1504px]">{`Advanced Prompting — Micro-Interactions & Visual Polish`}</p>
    </div>
  );
}

function Container85() {
  return <div className="bg-[#13c1ac] h-[4px] rounded-[16777200px] shrink-0 w-full" data-name="Container" />;
}

function Container84() {
  return (
    <div className="bg-[#f3f4f6] flex-[1_0_0] h-[4px] min-h-px min-w-px relative rounded-[16777200px]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[837.461px] relative size-full">
          <Container85 />
        </div>
      </div>
    </div>
  );
}

function Text43() {
  return (
    <div className="h-[16px] relative shrink-0 w-[19.273px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-px">0%</p>
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[16px] items-center left-0 top-[51.75px] w-[950px]" data-name="Container">
      <Container84 />
      <Text43 />
    </div>
  );
}

function Container81() {
  return (
    <div className="absolute h-[67.25px] left-[76px] top-[16px] w-[864.734px]" data-name="Container">
      <Container82 />
      <Paragraph9 />
      <Container83 />
    </div>
  );
}

function Icon35() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_4042_2561)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_4042_2561">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text44() {
  return (
    <div className="h-[16px] relative shrink-0 w-[70.266px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon35 />
        <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-px">2.5 hours</p>
      </div>
    </div>
  );
}

function Icon36() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_4042_2521)" id="Icon">
          <path d={svgPaths.p216a6c0} id="Vector" stroke="var(--stroke-0, #FE9A00)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_4042_2521">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text45() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[56.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon36 />
        <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[14px] not-italic text-[#fe9a00] text-[12px] top-px">200 XP</p>
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="flex-[1_0_0] h-[34px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-end relative size-full">
        <Text44 />
        <Text45 />
      </div>
    </div>
  );
}

function Icon37() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 5.33333">
            <path d={svgPaths.p32098840} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon37 />
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[34px] items-center left-[1075.73px] top-[32.63px] w-[102.266px]" data-name="Container">
      <Container87 />
      <Container88 />
    </div>
  );
}

function Icon38() {
  return (
    <div className="relative size-[40px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Icon">
          <path d={svgPaths.p22fc4900} id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeWidth="3" />
          <path d={svgPaths.p22fc4900} id="Vector_2" stroke="var(--stroke-0, #6366F1)" strokeLinecap="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Icon39() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2b283480} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.pbc77700} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container90() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 size-[40px] top-0" data-name="Container">
      <Icon39 />
    </div>
  );
}

function Container89() {
  return (
    <div className="absolute left-[20px] size-[40px] top-[29.63px]" data-name="Container">
      <div className="absolute flex items-center justify-center left-0 size-[40px] top-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <Icon38 />
        </div>
      </div>
      <Container90 />
    </div>
  );
}

function Button16() {
  return (
    <div className="h-[99.25px] relative shrink-0 w-full" data-name="Button">
      <Container81 />
      <Container86 />
      <Container89 />
    </div>
  );
}

function Container80() {
  return (
    <div className="bg-white h-[101.25px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <Button16 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text46() {
  return (
    <div className="absolute h-[16px] left-0 top-[3px] w-[22.32px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-px">S07</p>
    </div>
  );
}

function Text47() {
  return (
    <div className="absolute bg-[#f5f3ff] border border-[#ddd6ff] border-solid h-[22px] left-[28.32px] rounded-[16777200px] top-0 w-[75.203px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[8px] not-italic text-[#7008e7] text-[12px] top-[3px]">Advanced</p>
    </div>
  );
}

function Text48() {
  return (
    <div className="absolute bg-[#f9fafb] border border-[#e5e7eb] border-solid h-[22px] left-[109.52px] rounded-[16777200px] top-0 w-[59.578px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[8px] not-italic text-[#99a1af] text-[12px] top-[3px]">Locked</p>
    </div>
  );
}

function Container93() {
  return (
    <div className="absolute h-[22px] left-0 top-0 w-[875.289px]" data-name="Container">
      <Text46 />
      <Text47 />
      <Text48 />
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="absolute h-[19.25px] left-0 overflow-clip top-[26px] w-[875.289px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[19.25px] left-0 not-italic text-[#101828] text-[14px] top-0 tracking-[-0.1504px]">Figma Make + Supabase — Real Web Apps with a Live Backend</p>
    </div>
  );
}

function Container96() {
  return <div className="bg-[#13c1ac] h-[4px] rounded-[16777200px] shrink-0 w-full" data-name="Container" />;
}

function Container95() {
  return (
    <div className="bg-[#f3f4f6] flex-[1_0_0] h-[4px] min-h-px min-w-px relative rounded-[16777200px]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[848.016px] relative size-full">
          <Container96 />
        </div>
      </div>
    </div>
  );
}

function Text49() {
  return (
    <div className="h-[16px] relative shrink-0 w-[19.273px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-px">0%</p>
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[16px] items-center left-0 top-[51.5px] w-[950px]" data-name="Container">
      <Container95 />
      <Text49 />
    </div>
  );
}

function Container92() {
  return (
    <div className="absolute h-[67.25px] left-[76px] top-[16px] w-[875.289px]" data-name="Container">
      <Container93 />
      <Paragraph10 />
      <Container94 />
    </div>
  );
}

function Icon40() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_4042_2561)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_4042_2561">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text50() {
  return (
    <div className="h-[16px] relative shrink-0 w-[59.711px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon40 />
        <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-px">3 hours</p>
      </div>
    </div>
  );
}

function Icon41() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_4042_2521)" id="Icon">
          <path d={svgPaths.p216a6c0} id="Vector" stroke="var(--stroke-0, #FE9A00)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_4042_2521">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text51() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[56.633px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon41 />
        <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[14px] not-italic text-[#fe9a00] text-[12px] top-px">300 XP</p>
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="flex-[1_0_0] h-[34px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-end relative size-full">
        <Text50 />
        <Text51 />
      </div>
    </div>
  );
}

function Icon42() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 5.33333">
            <path d={svgPaths.p32098840} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container99() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon42 />
      </div>
    </div>
  );
}

function Container97() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[34px] items-center left-[1086.29px] top-[32.63px] w-[91.711px]" data-name="Container">
      <Container98 />
      <Container99 />
    </div>
  );
}

function Icon43() {
  return (
    <div className="relative size-[40px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Icon">
          <path d={svgPaths.p22fc4900} id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeWidth="3" />
          <path d={svgPaths.p22fc4900} id="Vector_2" stroke="var(--stroke-0, #6366F1)" strokeLinecap="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Icon44() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2b283480} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.pbc77700} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container101() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 size-[40px] top-0" data-name="Container">
      <Icon44 />
    </div>
  );
}

function Container100() {
  return (
    <div className="absolute left-[20px] size-[40px] top-[29.63px]" data-name="Container">
      <div className="absolute flex items-center justify-center left-0 size-[40px] top-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <Icon43 />
        </div>
      </div>
      <Container101 />
    </div>
  );
}

function Button17() {
  return (
    <div className="h-[99.25px] relative shrink-0 w-full" data-name="Button">
      <Container92 />
      <Container97 />
      <Container100 />
    </div>
  );
}

function Container91() {
  return (
    <div className="bg-white h-[101.25px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <Button17 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text52() {
  return (
    <div className="absolute h-[16px] left-0 top-[3px] w-[23.469px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-px">S08</p>
    </div>
  );
}

function Text53() {
  return (
    <div className="absolute bg-[#f5f3ff] border border-[#ddd6ff] border-solid h-[22px] left-[29.47px] rounded-[16777200px] top-0 w-[75.203px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[8px] not-italic text-[#7008e7] text-[12px] top-[3px]">Advanced</p>
    </div>
  );
}

function Text54() {
  return (
    <div className="absolute bg-[#f9fafb] border border-[#e5e7eb] border-solid h-[22px] left-[110.67px] rounded-[16777200px] top-0 w-[59.578px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[8px] not-italic text-[#99a1af] text-[12px] top-[3px]">Locked</p>
    </div>
  );
}

function Container104() {
  return (
    <div className="absolute h-[22px] left-0 top-0 w-[875.586px]" data-name="Container">
      <Text52 />
      <Text53 />
      <Text54 />
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="absolute h-[19.25px] left-0 overflow-clip top-[26px] w-[875.586px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[19.25px] left-0 not-italic text-[#101828] text-[14px] top-0 tracking-[-0.1504px]">Figma Make + Figma Sites — Publishing and Going Live</p>
    </div>
  );
}

function Container107() {
  return <div className="bg-[#13c1ac] h-[4px] rounded-[16777200px] shrink-0 w-full" data-name="Container" />;
}

function Container106() {
  return (
    <div className="bg-[#f3f4f6] flex-[1_0_0] h-[4px] min-h-px min-w-px relative rounded-[16777200px]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[848.313px] relative size-full">
          <Container107 />
        </div>
      </div>
    </div>
  );
}

function Text55() {
  return (
    <div className="h-[16px] relative shrink-0 w-[19.273px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-px">0%</p>
      </div>
    </div>
  );
}

function Container105() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[16px] items-center left-0 top-[51.25px] w-[950px]" data-name="Container">
      <Container106 />
      <Text55 />
    </div>
  );
}

function Container103() {
  return (
    <div className="absolute h-[67.25px] left-[76px] top-[16px] w-[875.586px]" data-name="Container">
      <Container104 />
      <Paragraph11 />
      <Container105 />
    </div>
  );
}

function Icon45() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_4042_2561)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_4042_2561">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text56() {
  return (
    <div className="h-[16px] relative shrink-0 w-[59.414px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon45 />
        <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-px">2 hours</p>
      </div>
    </div>
  );
}

function Icon46() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_4042_2521)" id="Icon">
          <path d={svgPaths.p216a6c0} id="Vector" stroke="var(--stroke-0, #FE9A00)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_4042_2521">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text57() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[56.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon46 />
        <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[14px] not-italic text-[#fe9a00] text-[12px] top-px">200 XP</p>
      </div>
    </div>
  );
}

function Container109() {
  return (
    <div className="flex-[1_0_0] h-[34px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-end relative size-full">
        <Text56 />
        <Text57 />
      </div>
    </div>
  );
}

function Icon47() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 5.33333">
            <path d={svgPaths.p32098840} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container110() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon47 />
      </div>
    </div>
  );
}

function Container108() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[34px] items-center left-[1086.59px] top-[32.63px] w-[91.414px]" data-name="Container">
      <Container109 />
      <Container110 />
    </div>
  );
}

function Icon48() {
  return (
    <div className="relative size-[40px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Icon">
          <path d={svgPaths.p22fc4900} id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeWidth="3" />
          <path d={svgPaths.p22fc4900} id="Vector_2" stroke="var(--stroke-0, #6366F1)" strokeLinecap="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Icon49() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2b283480} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.pbc77700} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container112() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 size-[40px] top-0" data-name="Container">
      <Icon49 />
    </div>
  );
}

function Container111() {
  return (
    <div className="absolute left-[20px] size-[40px] top-[29.63px]" data-name="Container">
      <div className="absolute flex items-center justify-center left-0 size-[40px] top-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <Icon48 />
        </div>
      </div>
      <Container112 />
    </div>
  );
}

function Button18() {
  return (
    <div className="h-[99.25px] relative shrink-0 w-full" data-name="Button">
      <Container103 />
      <Container108 />
      <Container111 />
    </div>
  );
}

function Container102() {
  return (
    <div className="bg-white h-[101.25px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <Button18 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text58() {
  return (
    <div className="absolute h-[16px] left-0 top-[3px] w-[23.414px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-px">S09</p>
    </div>
  );
}

function Text59() {
  return (
    <div className="absolute bg-[#f5f3ff] border border-[#ddd6ff] border-solid h-[22px] left-[29.41px] rounded-[16777200px] top-0 w-[75.203px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[8px] not-italic text-[#7008e7] text-[12px] top-[3px]">Advanced</p>
    </div>
  );
}

function Text60() {
  return (
    <div className="absolute bg-[#f9fafb] border border-[#e5e7eb] border-solid h-[22px] left-[110.62px] rounded-[16777200px] top-0 w-[59.578px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[8px] not-italic text-[#99a1af] text-[12px] top-[3px]">Locked</p>
    </div>
  );
}

function Container115() {
  return (
    <div className="absolute h-[22px] left-0 top-0 w-[875.586px]" data-name="Container">
      <Text58 />
      <Text59 />
      <Text60 />
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="absolute h-[19.25px] left-0 overflow-clip top-[26px] w-[875.586px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[19.25px] left-0 not-italic text-[#101828] text-[14px] top-0 tracking-[-0.1504px]">{`Figma Make for Product Teams — Templates & Collaboration`}</p>
    </div>
  );
}

function Container118() {
  return <div className="bg-[#13c1ac] h-[4px] rounded-[16777200px] shrink-0 w-full" data-name="Container" />;
}

function Container117() {
  return (
    <div className="bg-[#f3f4f6] flex-[1_0_0] h-[4px] min-h-px min-w-px relative rounded-[16777200px]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[848.313px] relative size-full">
          <Container118 />
        </div>
      </div>
    </div>
  );
}

function Text61() {
  return (
    <div className="h-[16px] relative shrink-0 w-[19.273px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-px">0%</p>
      </div>
    </div>
  );
}

function Container116() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[16px] items-center left-0 top-[51px] w-[950px]" data-name="Container">
      <Container117 />
      <Text61 />
    </div>
  );
}

function Container114() {
  return (
    <div className="absolute h-[67.25px] left-[76px] top-[16px] w-[875.586px]" data-name="Container">
      <Container115 />
      <Paragraph12 />
      <Container116 />
    </div>
  );
}

function Icon50() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_4042_2561)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_4042_2561">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text62() {
  return (
    <div className="h-[16px] relative shrink-0 w-[59.414px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon50 />
        <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-px">2 hours</p>
      </div>
    </div>
  );
}

function Icon51() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_4042_2521)" id="Icon">
          <path d={svgPaths.p216a6c0} id="Vector" stroke="var(--stroke-0, #FE9A00)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_4042_2521">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text63() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[56.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon51 />
        <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[14px] not-italic text-[#fe9a00] text-[12px] top-px">200 XP</p>
      </div>
    </div>
  );
}

function Container120() {
  return (
    <div className="flex-[1_0_0] h-[34px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-end relative size-full">
        <Text62 />
        <Text63 />
      </div>
    </div>
  );
}

function Icon52() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 5.33333">
            <path d={svgPaths.p32098840} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container121() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon52 />
      </div>
    </div>
  );
}

function Container119() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[34px] items-center left-[1086.59px] top-[32.63px] w-[91.414px]" data-name="Container">
      <Container120 />
      <Container121 />
    </div>
  );
}

function Icon53() {
  return (
    <div className="relative size-[40px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Icon">
          <path d={svgPaths.p22fc4900} id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeWidth="3" />
          <path d={svgPaths.p22fc4900} id="Vector_2" stroke="var(--stroke-0, #6366F1)" strokeLinecap="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Icon54() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2b283480} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.pbc77700} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container123() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 size-[40px] top-0" data-name="Container">
      <Icon54 />
    </div>
  );
}

function Container122() {
  return (
    <div className="absolute left-[20px] size-[40px] top-[29.63px]" data-name="Container">
      <div className="absolute flex items-center justify-center left-0 size-[40px] top-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <Icon53 />
        </div>
      </div>
      <Container123 />
    </div>
  );
}

function Button19() {
  return (
    <div className="h-[99.25px] relative shrink-0 w-full" data-name="Button">
      <Container114 />
      <Container119 />
      <Container122 />
    </div>
  );
}

function Container113() {
  return (
    <div className="bg-white h-[101.25px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <Button19 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text64() {
  return (
    <div className="absolute h-[16px] left-0 top-[3px] w-[21.344px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-px">S10</p>
    </div>
  );
}

function Text65() {
  return (
    <div className="absolute bg-[#fffbeb] border border-[#fee685] border-solid h-[22px] left-[27.34px] rounded-[16777200px] top-0 w-[66.922px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[8px] not-italic text-[#bb4d00] text-[12px] top-[3px]">Ongoing</p>
    </div>
  );
}

function Text66() {
  return (
    <div className="absolute bg-[#f9fafb] border border-[#e5e7eb] border-solid h-[22px] left-[100.27px] rounded-[16777200px] top-0 w-[59.578px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[8px] not-italic text-[#99a1af] text-[12px] top-[3px]">Locked</p>
    </div>
  );
}

function Container126() {
  return (
    <div className="absolute h-[22px] left-0 top-0 w-[880.281px]" data-name="Container">
      <Text64 />
      <Text65 />
      <Text66 />
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="absolute h-[19.25px] left-0 overflow-clip top-[26px] w-[880.281px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] leading-[19.25px] left-0 not-italic text-[#101828] text-[14px] top-0 tracking-[-0.1504px]">Staying Current — The Figma Make Learning Loop</p>
    </div>
  );
}

function Container129() {
  return <div className="bg-[#13c1ac] h-[4px] rounded-[16777200px] shrink-0 w-full" data-name="Container" />;
}

function Container128() {
  return (
    <div className="bg-[#f3f4f6] flex-[1_0_0] h-[4px] min-h-px min-w-px relative rounded-[16777200px]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[853.008px] relative size-full">
          <Container129 />
        </div>
      </div>
    </div>
  );
}

function Text67() {
  return (
    <div className="h-[16px] relative shrink-0 w-[19.273px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-px">0%</p>
      </div>
    </div>
  );
}

function Container127() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[16px] items-center left-0 top-[51.75px] w-[950px]" data-name="Container">
      <Container128 />
      <Text67 />
    </div>
  );
}

function Container125() {
  return (
    <div className="absolute h-[67.25px] left-[76px] top-[16px] w-[880.281px]" data-name="Container">
      <Container126 />
      <Paragraph13 />
      <Container127 />
    </div>
  );
}

function Icon55() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_4042_2561)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_4042_2561">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text68() {
  return (
    <div className="h-[16px] relative shrink-0 w-[51.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon55 />
        <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-px">1 hour</p>
      </div>
    </div>
  );
}

function Icon56() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_4042_2521)" id="Icon">
          <path d={svgPaths.p216a6c0} id="Vector" stroke="var(--stroke-0, #FE9A00)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_4042_2521">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text69() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[54.719px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon56 />
        <p className="absolute font-['Inter:Medium',sans-serif] leading-[16px] left-[14px] not-italic text-[#fe9a00] text-[12px] top-px">100 XP</p>
      </div>
    </div>
  );
}

function Container131() {
  return (
    <div className="flex-[1_0_0] h-[34px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-end relative size-full">
        <Text68 />
        <Text69 />
      </div>
    </div>
  );
}

function Icon57() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 5.33333">
            <path d={svgPaths.p32098840} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container132() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon57 />
      </div>
    </div>
  );
}

function Container130() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[34px] items-center left-[1089.28px] top-[32.63px] w-[86.719px]" data-name="Container">
      <Container131 />
      <Container132 />
    </div>
  );
}

function Icon58() {
  return (
    <div className="relative size-[40px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Icon">
          <path d={svgPaths.p22fc4900} id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeWidth="3" />
          <path d={svgPaths.p22fc4900} id="Vector_2" stroke="var(--stroke-0, #6366F1)" strokeLinecap="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Icon59() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2b283480} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.pbc77700} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container134() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 size-[40px] top-0" data-name="Container">
      <Icon59 />
    </div>
  );
}

function Container133() {
  return (
    <div className="absolute left-[20px] size-[40px] top-[29.63px]" data-name="Container">
      <div className="absolute flex items-center justify-center left-0 size-[40px] top-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <Icon58 />
        </div>
      </div>
      <Container134 />
    </div>
  );
}

function Button20() {
  return (
    <div className="h-[99.25px] relative shrink-0 w-full" data-name="Button">
      <Container125 />
      <Container130 />
      <Container133 />
    </div>
  );
}

function Container124() {
  return (
    <div className="bg-white h-[101.25px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <Button20 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <Container7 />
      <Container20 />
      <Container25 />
      <Container36 />
      <Container47 />
      <Container58 />
      <Container69 />
      <Container80 />
      <Container91 />
      <Container102 />
      <Container113 />
      <Container124 />
    </div>
  );
}

function Content() {
  return (
    <div className="relative shrink-0 w-full" data-name="content">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pb-[40px] pt-[24px] px-[120px] relative w-full">
          <Container5 />
        </div>
      </div>
    </div>
  );
}

function BerlinConversationsGroupHeader() {
  return (
    <div className="bg-white col-1 content-stretch flex flex-col items-start min-h-[800px] ml-0 mt-[68px] overflow-clip relative row-1 w-[1440px]" data-name="Berlin Conversations — Group Header">
      <GroupCard />
      <GroupCard1 />
      <Content />
    </div>
  );
}

function Search2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Search">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_4042_2541)" id="Search">
          <path clipRule="evenodd" d={svgPaths.p3367c700} fill="var(--fill-0, #6B7280)" fillRule="evenodd" id="Icon" />
        </g>
        <defs>
          <clipPath id="clip0_4042_2541">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BtnSearch2() {
  return (
    <div className="bg-white relative rounded-[14px] shrink-0 size-[34px]" data-name="btn-search">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <Search2 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Icon60() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_4042_2577)" id="Icon">
          <path d={svgPaths.p1ce3c700} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2468000} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2d94c080} id="Vector_3" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pbbb480} id="Vector_4" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_4042_2577">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button21() {
  return (
    <div className="bg-white h-[34px] relative rounded-[14px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col h-full items-start pb-px pt-[9px] px-[9px] relative">
        <Icon60 />
      </div>
    </div>
  );
}

function Icon61() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_12.5%_66.67%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33333 5.33333">
            <path d={svgPaths.p36446d40} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_62.5%_37.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33333 5.33333">
            <path d={svgPaths.p36446d40} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.67%_12.5%_8.33%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33333 5.33333">
            <path d={svgPaths.p36446d40} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[56.29%_35.75%_27.12%_35.79%]" data-name="Vector">
        <div className="absolute inset-[-25.13%_-14.64%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.88688 3.98688">
            <path d={svgPaths.p3e007700} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[27.13%_35.79%_56.29%_35.79%]" data-name="Vector">
        <div className="absolute inset-[-25.13%_-14.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.88022 3.98688">
            <path d={svgPaths.p309e7540} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button22() {
  return (
    <div className="bg-white relative rounded-[14px] shrink-0 size-[34px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pt-[9px] px-[9px] relative size-full">
        <Icon61 />
      </div>
    </div>
  );
}

function Icon62() {
  return (
    <div className="absolute left-[20px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3694d280} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M12.6667 5.33333V9.33333" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14.6667 7.33333H10.6667" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button23() {
  return (
    <div className="bg-[#13c1ac] flex-[1_0_0] h-[36px] min-h-px min-w-px relative rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon62 />
        <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] leading-[20px] left-[80.5px] not-italic text-[14px] text-center text-white top-[8.5px] tracking-[-0.1504px]">{` Join Group`}</p>
      </div>
    </div>
  );
}

function Container135() {
  return (
    <div className="content-stretch flex gap-[8px] h-[40px] items-center relative shrink-0 w-[219.93px]" data-name="Container">
      <Button21 />
      <Button22 />
      <Button23 />
    </div>
  );
}

function Actions2() {
  return (
    <div className="col-1 content-stretch flex gap-[12px] items-start justify-end ml-[1050px] mt-[382px] overflow-clip relative row-1" data-name="actions">
      <BtnSearch2 />
      <Container135 />
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Header />
      <BerlinConversationsGroupHeader />
      <Actions2 />
    </div>
  );
}

function PlusCircle() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Plus Circle">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_4029_6445)" id="Plus Circle">
          <g id="Icon">
            <path d={svgPaths.p2c57e880} fill="var(--fill-0, #6B7280)" />
            <path clipRule="evenodd" d={svgPaths.p5496a80} fill="var(--fill-0, #6B7280)" fillRule="evenodd" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_4029_6445">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function HelpIcon() {
  return (
    <div className="absolute bg-white bottom-[23.5px] right-[24px] rounded-[20px] size-[40px]" data-name="help-icon">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <PlusCircle />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)]" />
    </div>
  );
}

function PartyPopper() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Party Popper">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Party Popper">
          <g id="Icon">
            <path d={svgPaths.p38f63700} fill="var(--fill-0, white)" />
            <path d={svgPaths.p679fc00} fill="var(--fill-0, white)" />
            <path clipRule="evenodd" d={svgPaths.p311cf500} fill="var(--fill-0, white)" fillRule="evenodd" />
            <path d={svgPaths.p1fbe2100} fill="var(--fill-0, white)" />
            <path d={svgPaths.p12489200} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3490d300} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3f853980} fill="var(--fill-0, white)" />
            <path clipRule="evenodd" d={svgPaths.p2fc49f70} fill="var(--fill-0, white)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function FabLaunchAssistant() {
  return (
    <div className="absolute bg-[#13c1ac] bottom-[24px] content-stretch flex flex-col items-center justify-center overflow-clip right-[24px] rounded-[28px] shadow-[0px_8px_20px_-4px_rgba(0,0,0,0.15)] size-[56px]" data-name="fab-launch-assistant">
      <PartyPopper />
    </div>
  );
}

export default function AiBuilderDesktop() {
  return (
    <div className="bg-[#f4fcfb] content-stretch flex flex-col gap-[64px] items-center pb-[80px] px-[120px] relative size-full" data-name="AI Builder — Desktop">
      <Group />
      <HelpIcon />
      <FabLaunchAssistant />
    </div>
  );
}