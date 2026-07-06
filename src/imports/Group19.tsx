import svgPaths from "./svg-xec5lh6hkp";
import imgEllipse from "figma:asset/872b2e2bb8fd16ff43804d22e7230aa0f21f72c2.png";
import imgHeroImage from "figma:asset/a50e0a8b8ef9fafe1f423c3011370eaff3f4e66d.png";

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
    <div className="absolute bg-white content-stretch flex h-[77.372px] items-center left-0 overflow-clip px-[24px] py-[16px] right-0 top-0" data-name="Header">
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
    <div className="bg-[#7f22fe] flex-[1_0_0] h-[36px] min-h-px min-w-px relative rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" data-name="Button">
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

function GroupCard1() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="group-card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start px-[120px] py-[16px] relative w-full">
          <StatusTag />
          <p className="font-['Space_Grotesk:Bold',sans-serif] font-bold leading-[1.1] relative shrink-0 text-[#111827] text-[48px] w-[876px] whitespace-pre-wrap">What do you want to learn?</p>
          <p className="font-['Inter:Regular',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[#6b7280] text-[13px] w-[min-content] whitespace-pre-wrap">{`Part of the "Google UX Design Professional Certificate"`}</p>
          <Divider />
          <Actions1 />
        </div>
      </div>
    </div>
  );
}

function Content() {
  return <div className="h-[986px] shrink-0 w-[1044px]" data-name="content" />;
}

function BerlinConversationsGroupHeader() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[1625.543px] items-start left-0 min-h-[800px] overflow-clip right-0 top-[77.46px]" data-name="Berlin Conversations — Group Header">
      <GroupCard />
      <GroupCard1 />
      <Content />
    </div>
  );
}

function Frame5() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_4044_3798)" id="Frame">
          <path d={svgPaths.p70a6b80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.67" />
          <path d="M14.9994 2.25V5.2506" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.67" />
          <path d="M16.5006 3.7494H13.5" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.67" />
          <path d="M3.0006 12.7494V14.2506" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.67" />
          <path d="M3.7494 13.5H2.25" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.67" />
        </g>
        <defs>
          <clipPath id="clip0_4044_3798">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function AssistantIcon() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[16px] shrink-0 size-[32px]" data-name="assistant-icon" style={{ backgroundImage: "linear-gradient(135deg, rgb(19, 193, 172) 0%, rgb(15, 154, 143) 100%)" }}>
      <Frame5 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start leading-[normal] not-italic overflow-clip relative shrink-0" data-name="Frame">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#111827] text-[16px]">AI Assistant</p>
      <p className="font-['Inter:Regular',sans-serif] relative shrink-0 text-[#6b7280] text-[12px]">Ask me anything</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Frame">
      <AssistantIcon />
      <Frame6 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Frame">
          <path d="M3.5 5.25L7 8.75L10.5 5.25" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeWidth="1.33" />
        </g>
      </svg>
    </div>
  );
}

function CloseButton() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[14px] shrink-0 size-[28px]" data-name="close-button">
      <Frame7 />
    </div>
  );
}

function SidebarHeader() {
  return (
    <div className="relative shrink-0 w-full" data-name="sidebar-header">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between p-[16px] relative w-full">
          <Frame4 />
          <CloseButton />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame8() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_4044_3798)" id="Frame">
          <path d={svgPaths.p70a6b80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.67" />
          <path d="M14.9994 2.25V5.2506" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.67" />
          <path d="M16.5006 3.7494H13.5" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.67" />
          <path d="M3.0006 12.7494V14.2506" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.67" />
          <path d="M3.7494 13.5H2.25" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.67" />
        </g>
        <defs>
          <clipPath id="clip0_4044_3798">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Avatar() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[16px] shrink-0 size-[32px]" data-name="avatar" style={{ backgroundImage: "linear-gradient(135deg, rgb(19, 193, 172) 0%, rgb(15, 154, 143) 100%)" }}>
      <Frame8 />
    </div>
  );
}

function MessageBubble() {
  return (
    <div className="bg-[#f9fafb] flex-[1_0_0] min-h-px min-w-px relative rounded-[12px]" data-name="message-bubble">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[12px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#111827] text-[14px] w-full whitespace-pre-wrap">{`Hi! I'm your AI learning assistant. How can I help you master Figma Make today?`}</p>
        </div>
      </div>
    </div>
  );
}

function AssistantMessage() {
  return (
    <div className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-name="assistant-message">
      <Avatar />
      <MessageBubble />
    </div>
  );
}

function MessageBubble1() {
  return (
    <div className="bg-[#f3fcfb] flex-[1_0_0] min-h-px min-w-px relative rounded-[12px]" data-name="message-bubble">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[12px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#111827] text-[14px] w-full whitespace-pre-wrap">{`I'm stuck on Step 4. Can you explain how to connect my design system?`}</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(19,193,172,0.2)] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function UserMessage() {
  return (
    <div className="content-stretch flex items-start justify-end overflow-clip relative shrink-0 w-full" data-name="user-message">
      <MessageBubble1 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_4044_3798)" id="Frame">
          <path d={svgPaths.p70a6b80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.67" />
          <path d="M14.9994 2.25V5.2506" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.67" />
          <path d="M16.5006 3.7494H13.5" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.67" />
          <path d="M3.0006 12.7494V14.2506" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.67" />
          <path d="M3.7494 13.5H2.25" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.67" />
        </g>
        <defs>
          <clipPath id="clip0_4044_3798">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Avatar1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[16px] shrink-0 size-[32px]" data-name="avatar" style={{ backgroundImage: "linear-gradient(135deg, rgb(19, 193, 172) 0%, rgb(15, 154, 143) 100%)" }}>
      <Frame9 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[6px] items-start not-italic p-[12px] relative text-[13px] w-full whitespace-pre-wrap">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#111827] w-full">Step 1: Enable Make in your design file</p>
          <p className="font-['Inter:Regular',sans-serif] leading-[1.5] relative shrink-0 text-[#6b7280] w-full">Go to Settings → Plugins → Figma Make and toggle it on.</p>
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#111827] w-full">Step 2: Link your design system</p>
          <p className="font-['Inter:Regular',sans-serif] leading-[1.5] relative shrink-0 text-[#6b7280] w-full">{`In the Make panel, click "Connect Design System" and select your component library.`}</p>
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#111827] w-full">Step 3: Configure variants</p>
          <p className="font-['Inter:Regular',sans-serif] leading-[1.5] relative shrink-0 text-[#6b7280] w-full">Map your component variants to Make properties for dynamic controls.</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function MessageBubble2() {
  return (
    <div className="bg-[#f9fafb] flex-[1_0_0] min-h-px min-w-px relative rounded-[12px]" data-name="message-bubble">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start p-[12px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#111827] text-[14px] w-full whitespace-pre-wrap">Connecting your design system to Figma Make is straightforward. First, ensure your design system is properly organized with components and variants. Then, follow these steps:</p>
          <Frame10 />
        </div>
      </div>
    </div>
  );
}

function AssistantMessage1() {
  return (
    <div className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-name="assistant-message">
      <Avatar1 />
      <MessageBubble2 />
    </div>
  );
}

function ChatArea() {
  return (
    <div className="h-[796px] relative shrink-0 w-full" data-name="chat-area">
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] relative size-full">
        <AssistantMessage />
        <UserMessage />
        <AssistantMessage1 />
      </div>
    </div>
  );
}

function InputField() {
  return (
    <div className="bg-[#f9fafb] flex-[1_0_0] min-h-px min-w-px relative rounded-[12px]" data-name="input-field">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-[12px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#9ca3af] text-[14px] whitespace-pre-wrap">Type your message...</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Frame11() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p2bb2b100} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.33" />
          <path d={svgPaths.p2b394300} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.33" />
          <path d="M15.834 6.666V11.666" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.33" />
          <path d="M18.334 9.166H13.334" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.33" />
        </g>
      </svg>
    </div>
  );
}

function SendButton() {
  return (
    <div className="bg-[#13c1ac] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[20px] shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 size-[40px]" data-name="send-button">
      <Frame11 />
    </div>
  );
}

function InputArea() {
  return (
    <div className="relative shrink-0 w-full" data-name="input-area">
      <div className="flex flex-row items-end justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-end justify-center p-[16px] relative w-full">
          <InputField />
          <SendButton />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
    </div>
  );
}

function AssistantSidebar() {
  return (
    <div className="absolute bg-white h-[981.945px] left-[1024px] rounded-[16px] top-[88.75px] w-[400px]" data-name="assistant-sidebar">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <SidebarHeader />
        <ChatArea />
        <InputArea />
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-l border-solid inset-0 pointer-events-none rounded-[16px] shadow-[-2px_0px_8px_0px_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Chevron Down">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Chevron Down">
          <path clipRule="evenodd" d={svgPaths.p3a568ac0} fill="var(--fill-0, #6B7280)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ArrowLeft() {
  return (
    <div className="relative rounded-[16px] shrink-0 size-[32px]" data-name="arrow-left">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <ChevronDown />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function ChevronDown1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Chevron Down">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Chevron Down">
          <path clipRule="evenodd" d={svgPaths.p3a568ac0} fill="var(--fill-0, #6B7280)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ArrowRight() {
  return (
    <div className="relative rounded-[16px] shrink-0 size-[32px]" data-name="arrow-right">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <ChevronDown1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function HeaderActions() {
  return (
    <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0" data-name="header-actions">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#11b09f] text-[14px]">See more</p>
      <ArrowLeft />
      <ArrowRight />
    </div>
  );
}

function SectionHeader() {
  return (
    <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-name="section-header">
      <p className="font-['Inter:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#111827] text-[24px] w-[312px] whitespace-pre-wrap">Recommended Courses</p>
      <HeaderActions />
    </div>
  );
}

function Plus() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Plus">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Plus">
          <path d={svgPaths.p16d99100} fill="var(--fill-0, #11B09F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Icon6() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[12px] shrink-0 size-[40px]" data-name="icon">
      <Plus />
    </div>
  );
}

function Card() {
  return (
    <div className="bg-[#f3f4f6] flex-[1_0_0] h-[252px] min-h-px min-w-px relative rounded-[16px]" data-name="card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[16px] relative size-full">
          <Icon6 />
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] min-w-full not-italic relative shrink-0 text-[#111827] text-[18px] w-[min-content] whitespace-pre-wrap">Create a new course</p>
          <p className="font-['Inter:Regular',sans-serif] leading-[1.5] min-w-full not-italic relative shrink-0 text-[#6b7280] text-[14px] w-[min-content] whitespace-pre-wrap">Share your knowledge and build a course with AI assistance.</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function Grid1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Grid">
      <div className="absolute inset-[8.33%]" data-name="Icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
          <g id="Icon">
            <path clipRule="evenodd" d={svgPaths.p1e51af0} fill="var(--fill-0, #11B09F)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p29163200} fill="var(--fill-0, #11B09F)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p33fef240} fill="var(--fill-0, #11B09F)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.pe2b6400} fill="var(--fill-0, #11B09F)" fillRule="evenodd" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[12px] shrink-0 size-[40px]" data-name="icon">
      <Grid1 />
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[16px]" data-name="card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[16px] relative w-full">
          <Icon7 />
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] min-w-full not-italic relative shrink-0 text-[#111827] text-[18px] w-[min-content] whitespace-pre-wrap">Prompt Engineering for PMs</p>
          <p className="font-['Inter:Regular',sans-serif] leading-[1.5] min-w-full not-italic relative shrink-0 text-[#6b7280] text-[14px] w-[min-content] whitespace-pre-wrap">Master the art of crafting effective prompts to get reliable results from AI tools and ship better products.</p>
          <p className="font-['Inter:Regular',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[#9ca3af] text-[13px] w-[min-content] whitespace-pre-wrap">4 lessons • Practical patterns</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function FileFill() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="File Fill">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="File Fill">
          <g id="Icon">
            <path d={svgPaths.p22041c00} fill="var(--fill-0, #11B09F)" />
            <path d={svgPaths.p31a12380} fill="var(--fill-0, #11B09F)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon8() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[12px] shrink-0 size-[40px]" data-name="icon">
      <FileFill />
    </div>
  );
}

function Card2() {
  return (
    <div className="bg-white flex-[1_0_0] h-[252px] min-h-px min-w-px relative rounded-[16px]" data-name="card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[16px] relative size-full">
          <Icon8 />
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] min-w-full not-italic relative shrink-0 text-[#111827] text-[18px] w-[min-content] whitespace-pre-wrap">AI‑Driven UX Research</p>
          <p className="font-['Inter:Regular',sans-serif] leading-[1.5] min-w-full not-italic relative shrink-0 text-[#6b7280] text-[14px] w-[min-content] whitespace-pre-wrap">Use AI to accelerate user research, analyze feedback, and synthesize insights faster.</p>
          <p className="font-['Inter:Regular',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[#9ca3af] text-[13px] w-[min-content] whitespace-pre-wrap">5 lessons • Research toolkit</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function CardsRow() {
  return (
    <div className="content-stretch flex gap-[24px] items-start overflow-clip relative shrink-0 w-full" data-name="cards-row">
      <Card />
      <Card1 />
      <Card2 />
    </div>
  );
}

function Grid2() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Grid">
      <div className="absolute inset-[8.33%]" data-name="Icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
          <g id="Icon">
            <path clipRule="evenodd" d={svgPaths.p1e51af0} fill="var(--fill-0, #11B09F)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p29163200} fill="var(--fill-0, #11B09F)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p33fef240} fill="var(--fill-0, #11B09F)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.pe2b6400} fill="var(--fill-0, #11B09F)" fillRule="evenodd" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[12px] shrink-0 size-[40px]" data-name="icon">
      <Grid2 />
    </div>
  );
}

function Card3() {
  return (
    <div className="bg-white flex-[1_0_0] h-[252px] min-h-px min-w-px relative rounded-[16px]" data-name="card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[16px] relative size-full">
          <Icon9 />
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] min-w-full not-italic relative shrink-0 text-[#111827] text-[18px] w-[min-content] whitespace-pre-wrap">AI Product Strategy</p>
          <p className="font-['Inter:Regular',sans-serif] leading-[1.5] min-w-full not-italic relative shrink-0 text-[#6b7280] text-[14px] w-[min-content] whitespace-pre-wrap">Define AI-powered product visions, identify opportunities, and build roadmaps that deliver measurable impact.</p>
          <p className="font-['Inter:Regular',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[#9ca3af] text-[13px] w-[min-content] whitespace-pre-wrap">4 lessons • Strategic frameworks</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function Grid3() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Grid">
      <div className="absolute inset-[8.33%]" data-name="Icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
          <g id="Icon">
            <path clipRule="evenodd" d={svgPaths.p1e51af0} fill="var(--fill-0, #11B09F)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p29163200} fill="var(--fill-0, #11B09F)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p33fef240} fill="var(--fill-0, #11B09F)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.pe2b6400} fill="var(--fill-0, #11B09F)" fillRule="evenodd" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[12px] shrink-0 size-[40px]" data-name="icon">
      <Grid3 />
    </div>
  );
}

function Card4() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[16px]" data-name="card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[16px] relative w-full">
          <Icon10 />
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] min-w-full not-italic relative shrink-0 text-[#111827] text-[18px] w-[min-content] whitespace-pre-wrap">NLP for Product Managers</p>
          <p className="font-['Inter:Regular',sans-serif] leading-[1.5] min-w-full not-italic relative shrink-0 text-[#6b7280] text-[14px] w-[min-content] whitespace-pre-wrap">Understand language models, evaluate NLP vendors, and integrate text-based AI into your products.</p>
          <p className="font-['Inter:Regular',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[#9ca3af] text-[13px] w-[min-content] whitespace-pre-wrap">4 lessons • Technical literacy</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function FileFill1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="File Fill">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="File Fill">
          <g id="Icon">
            <path d={svgPaths.p22041c00} fill="var(--fill-0, #11B09F)" />
            <path d={svgPaths.p31a12380} fill="var(--fill-0, #11B09F)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon11() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[12px] shrink-0 size-[40px]" data-name="icon">
      <FileFill1 />
    </div>
  );
}

function Card5() {
  return (
    <div className="bg-white flex-[1_0_0] h-[252px] min-h-px min-w-px relative rounded-[16px]" data-name="card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[16px] relative size-full">
          <Icon11 />
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] min-w-full not-italic relative shrink-0 text-[#111827] text-[18px] w-[min-content] whitespace-pre-wrap">AI‑Driven UX Research</p>
          <p className="font-['Inter:Regular',sans-serif] leading-[1.5] min-w-full not-italic relative shrink-0 text-[#6b7280] text-[14px] w-[min-content] whitespace-pre-wrap">Use AI to accelerate user research, analyze feedback, and synthesize insights faster.</p>
          <p className="font-['Inter:Regular',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[#9ca3af] text-[13px] w-[min-content] whitespace-pre-wrap">5 lessons • Research toolkit</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function CardsRow1() {
  return (
    <div className="content-stretch flex gap-[24px] items-start overflow-clip relative shrink-0 w-full" data-name="cards-row">
      <Card3 />
      <Card4 />
      <Card5 />
    </div>
  );
}

function Grid4() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Grid">
      <div className="absolute inset-[8.33%]" data-name="Icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
          <g id="Icon">
            <path clipRule="evenodd" d={svgPaths.p1e51af0} fill="var(--fill-0, #11B09F)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p29163200} fill="var(--fill-0, #11B09F)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p33fef240} fill="var(--fill-0, #11B09F)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.pe2b6400} fill="var(--fill-0, #11B09F)" fillRule="evenodd" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[12px] shrink-0 size-[40px]" data-name="icon">
      <Grid4 />
    </div>
  );
}

function Card6() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[16px]" data-name="card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[16px] relative w-full">
          <Icon12 />
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] min-w-full not-italic relative shrink-0 text-[#111827] text-[18px] w-[min-content] whitespace-pre-wrap">Cloud Computing Essentials</p>
          <p className="font-['Inter:Regular',sans-serif] leading-[1.5] min-w-full not-italic relative shrink-0 text-[#6b7280] text-[14px] w-[min-content] whitespace-pre-wrap">Master AWS, Azure, or GCP - deploy scalable apps, manage costs, and secure cloud infrastructure.</p>
          <p className="font-['Inter:Regular',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[#9ca3af] text-[13px] w-[min-content] whitespace-pre-wrap">4 lessons • Practical patterns</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function Grid5() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Grid">
      <div className="absolute inset-[8.33%]" data-name="Icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
          <g id="Icon">
            <path clipRule="evenodd" d={svgPaths.p1e51af0} fill="var(--fill-0, #11B09F)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p29163200} fill="var(--fill-0, #11B09F)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p33fef240} fill="var(--fill-0, #11B09F)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.pe2b6400} fill="var(--fill-0, #11B09F)" fillRule="evenodd" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[12px] shrink-0 size-[40px]" data-name="icon">
      <Grid5 />
    </div>
  );
}

function Card7() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[16px]" data-name="card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[16px] relative w-full">
          <Icon13 />
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] min-w-full not-italic relative shrink-0 text-[#111827] text-[18px] w-[min-content] whitespace-pre-wrap">Cloud Computing Essentials</p>
          <p className="font-['Inter:Regular',sans-serif] leading-[1.5] min-w-full not-italic relative shrink-0 text-[#6b7280] text-[14px] w-[min-content] whitespace-pre-wrap">Master AWS, Azure, or GCP - deploy scalable apps, manage costs, and secure cloud infrastructure.</p>
          <p className="font-['Inter:Regular',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[#9ca3af] text-[13px] w-[min-content] whitespace-pre-wrap">4 lessons • Practical patterns</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function FileFill2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="File Fill">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="File Fill">
          <g id="Icon">
            <path d={svgPaths.p22041c00} fill="var(--fill-0, #11B09F)" />
            <path d={svgPaths.p31a12380} fill="var(--fill-0, #11B09F)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon14() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[12px] shrink-0 size-[40px]" data-name="icon">
      <FileFill2 />
    </div>
  );
}

function Card8() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[16px]" data-name="card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[16px] relative w-full">
          <Icon14 />
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] min-w-full not-italic relative shrink-0 text-[#111827] text-[18px] w-[min-content] whitespace-pre-wrap">Digital Marketing Strategy</p>
          <p className="font-['Inter:Regular',sans-serif] leading-[1.5] min-w-full not-italic relative shrink-0 text-[#6b7280] text-[14px] w-[min-content] whitespace-pre-wrap">Build campaigns that convert - SEO, paid social, email, and analytics to drive measurable growth.</p>
          <p className="font-['Inter:Regular',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[#9ca3af] text-[13px] w-[min-content] whitespace-pre-wrap">5 lessons • Research toolkit</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function CardsRow2() {
  return (
    <div className="content-stretch flex gap-[24px] items-start overflow-clip relative shrink-0 w-full" data-name="cards-row">
      <Card6 />
      <Card7 />
      <Card8 />
    </div>
  );
}

function Variation1Horizontal() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-[118px] overflow-clip top-[525px] w-[819px]" data-name="variation-1-horizontal">
      <SectionHeader />
      <CardsRow />
      <CardsRow1 />
      <CardsRow2 />
    </div>
  );
}

export default function Group() {
  return (
    <div className="relative size-full">
      <Header />
      <BerlinConversationsGroupHeader />
      <AssistantSidebar />
      <Variation1Horizontal />
    </div>
  );
}