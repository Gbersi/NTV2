"use client";
export default function Home() {
  const shrekData = {
    header: {
      name: "Shrek",
      title: "Swamp Enthusiast | Ogre Extraordinaire",
      image: "/shrek.jpg",
    },
    contact: {
      email: "shrek@swampmail.com",
      phone: "+123 456 7890",
      location: "Shrek's Swamp, Far Far Away",
    },
    skills: [
      "Swamp Maintenance",
      "Ogre Roaring",
      "Onion Layer Analysis",
      "Donkey Management",
      "Dragon Communication",
    ],
    workExperience: [
      {
        title: "Swamp Owner",
        period: "2001 - Present",
        location: "Far Far Away",
        description:
          "Responsible for maintaining the swamp and keeping unwelcome guests away.",
      },
      {
        title: "Hero of Far Far Away",
        period: "2004 - Present",
        location: "Far Far Away",
        description:
          "Saved Princess Fiona, defeated Lord Farquaad, and rescued the kingdom from multiple threats.",
      },
    ],
    education: {
      degree: "Advanced Swampology",
      institution: "Ogre Academy, Far Far Away",
    },
    footerQuote: "“Ogres are like onions. Onions have layers. Ogres have layers.” – Shrek",
  };

  return (
    <div className="bg-blue-50 p-6 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded overflow-hidden">
        <header className="bg-green-600 rounded-t-xl flex flex-col text-white text-center p-4">
          <img
            src={shrekData.header.image}
            alt="Shrek's Photo"
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white object-cover"
          />
          <h1 className="text-3xl font-bold">{shrekData.header.name}</h1>
          <p className="text-lg">{shrekData.header.title}</p>
        </header>

        <section className="p-6 border-b border-gray-200">
          <h2 className="bg-green-900 text-white text-xl font-semibold p-2 mb-2">
            Contact Information
          </h2>
          <p>
            <strong>Email:</strong> {shrekData.contact.email}
          </p>
          <p>
            <strong>Phone:</strong> {shrekData.contact.phone}
          </p>
          <p>
            <strong>Location:</strong> {shrekData.contact.location}
          </p>
        </section>

        <section className="p-6 border-b border-gray-200">
          <h2 className="bg-green-900 text-white text-xl font-semibold p-2 mb-2">
            Skills
          </h2>
          <ul className="list-disc list-inside space-y-1">
            {shrekData.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>

        <section className="p-6 border-b border-gray-200">
          <h2 className="bg-green-900 text-white text-xl font-semibold p-2 mb-4">
            Work Experience
          </h2>
          {shrekData.workExperience.map((job, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-bold">{job.title}</h3>
              <p className="text-gray-600">
                {job.location} | {job.period}
              </p>
              <p>{job.description}</p>
            </div>
          ))}
        </section>

        <section className="p-6 border-b border-gray-200">
          <h2 className="bg-green-900 text-white text-xl font-semibold p-2 mb-2">
            Education
          </h2>
          <p>
            <strong>Degree:</strong> {shrekData.education.degree}
          </p>
          <p>
            <strong>Institution:</strong> {shrekData.education.institution}
          </p>
        </section>

        <footer className="bg-green-600 text-green-900 text-center p-6 italic">
          {shrekData.footerQuote}
        </footer>
      </div>
    </div>
  );
}
