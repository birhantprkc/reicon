import { ArrowRightUp } from 'reicon-react';
import ClayButton from '../../components/ClayButton';

const BRANDS = [
  'Google', 'Meta', 'Apple', 'Microsoft', 'Amazon', 'Netflix',
  'Spotify', 'Slack', 'Figma', 'GitHub', 'Discord', 'Notion',
  'Stripe', 'Vercel', 'Tailwind', 'React', 'TypeScript', 'Linux',
];

export default function Brands() {
  return (
    <section className="reveal max-w-[1160px] mx-auto px-5 md:px-10 py-13">
      <div className="text-center mb-14">
        <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6C5CE7] mb-2">Brand Icons</div>
        <h2 className="font-serif text-[clamp(26px,3.6vw,46px)] text-text-base leading-[1.15] tracking-[-0.02em] mb-3">
          Introducing <span className="text-[#6C5CE7]">brands.reicon.dev</span>
        </h2>
        <p className="text-[15px] text-text-base/45 leading-[1.65] max-w-[530px] mx-auto">
          4,900+ brand logos in Outline, Filled, and Color variants — now available for free. Same MIT license, same quality.
        </p>
      </div>

      <div className="bg-text-base/3 rounded-[14px] p-8 md:p-12">
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {BRANDS.map((name) => (
            <span key={name} className="text-[12px] font-medium text-text-base/50 bg-text-base/6 px-3.5 py-1.5 rounded-full">
              {name}
            </span>
          ))}
          <span className="text-[12px] font-medium text-[#6C5CE7] bg-[#6C5CE7]/10 px-3.5 py-1.5 rounded-full">
            +4,900 more
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[14px] mb-10">
          <div className="bg-text-base/4 rounded-[12px] p-5 text-center">
            <div className="text-[28px] font-bold text-text-base mb-1">4,900+</div>
            <div className="text-[13px] text-text-base/45">Brand logos</div>
          </div>
          <div className="bg-text-base/4 rounded-[12px] p-5 text-center">
            <div className="text-[28px] font-bold text-text-base mb-1">3</div>
            <div className="text-[13px] text-text-base/45">Icon variants</div>
          </div>
          <div className="bg-text-base/4 rounded-[12px] p-5 text-center">
            <div className="text-[28px] font-bold text-text-base mb-1">Free</div>
            <div className="text-[13px] text-text-base/45">MIT licensed</div>
          </div>
        </div>

        <div className="text-center">
          <ClayButton href="https://brands.reicon.dev" variant="accent">
            Browse Brands
            <ArrowRightUp size={15} />
          </ClayButton>
        </div>
      </div>
    </section>
  );
}
