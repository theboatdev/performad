interface TeamMember { name: string; role: string; image: string; linkedin: string; }
interface Props { team: TeamMember[]; }

const FALLBACK: TeamMember[] = [
  { name: "Yasitha Renuka", role: "CEO & Co-Founder", image: "/images/team/TeamPic.png", linkedin: "https://linkedin.com/in/yasitha" },
  { name: "Maleesha Ilankoon", role: "CMO & Co-Founder", image: "/images/team/TeamPic.png", linkedin: "https://linkedin.com/in/maleesha" },
  { name: "Sanoj Kumara", role: "CEO & Co-Founder", image: "/images/team/TeamPic.png", linkedin: "https://linkedin.com/in/sanoj" },
  { name: "Sonal Jayasinghe", role: "CEO & Co-Founder", image: "/images/team/TeamPic.png", linkedin: "https://linkedin.com/in/sonal" },
];

export default function TeamInfo({ team }: Props) {
  const list = team.length > 0 ? team : FALLBACK;
  return (
    <>
      <div>
        <p className="text-primary text-lg md:text-xl font-bold mb-4">Our Expert Team</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-0 md:mb-4">Meet Our Professional</h1>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Team Members</h1>
      </div>
      <section className="py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {list.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-xl p-4 text-center">
              <div className="relative">
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover rounded-lg" />
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="absolute bottom-2 left-2 bg-white rounded-full p-1">
                  <img src="/LinkedinLogo.png" alt="LinkedIn" className="w-6 h-6" />
                </a>
              </div>
              <h3 className="mt-4 font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}