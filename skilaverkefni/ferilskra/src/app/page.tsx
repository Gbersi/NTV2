"use client";

const cvData = {
  header: {
    title: "Gunnar Bersi Björnsson",
    name: "Öryggisráðgjafi & Forritari",
    image: "/headshot.jpg",
  },
  contact: {
    phone: "+354 692-8751",
    address: "Lyngás 1A, 210, Garðabæ",
    email: "gunnarbersi@gmail.com",
  },
  languages: [
    { language: "Enska", level: "Fluent" },
    { language: "Íslenska", level: "Fluent" },
    { language: "Spænska", level: "Grunn kunnátta" },
    { language: "Dönsku", level: "Grunn kunnátta" },
  ],
  workExperience: [
    {
      title: "Borgarleikhúsið",
      period: "Sviðsmaður 2022 – 2023",
      description:
        "Setja upp og taka niður leikmyndir fyrir Leiksýningar. Stjórnaði sviði og tjaldi fyrir 9 Líf sýninguna ásamt hlutverki í sýningunni. Sýningarstjóri á nemendasýningum og dans-sýningum. Setja upp troll og rigga öryggisbúnað og festingar.",
    },
    {
      title: "Öryggismiðstöð Íslands (samantekt)",
      period:
        "Útkallsmaður, Varðstjóri, Sölumaður, Tæknimaður 2015 - 2021",
      description:
        "Yfirsýn, verkstýring, þjálfun og ábyrgð á starfsfólki. Útköll í innbrots/bruna og árásarboð. Fyrsta hjálp og aðstoð við skjólstæðinga með neyðarhnapp. Yfirferð á brunavörnum, hleðsla og þrýstiprófun á slökkvitækjum. Tilboðsgerð, útboð og viðskiptastjórn hjá minni fyrirtækjum. Sérþekking á öryggiskerfum, aðgangsstýrikerfum, brunakerfum og myndavélakerfum ásamt slökkvitækjum.",
    },
  ],
  education: [
    {
      institution: "Menntaskólinn í Kópavogi",
      course: "Náttúrufræðibraut",
      period: "2012 – 2014",
    },
    {
      institution: "NTV",
      course: "Forritun",
      period: "2024 – Núverandi",
    },
  ],
  Recomendations: [
    {
      name: "Eyþór Guðmundsson",
      title: "Fyrrum verkefnastjóri 115 og rekstrarstjóri Geo Security Iceland",
      contact: "+354 893-6121",
    },
    {
      name: "Kjartan Þórisson",
      title: "Deildarstjóri Leiksviðs",
      contact: "+354 774-5454",
    },
  ],
  skills: {
    strengths: [
      "Vinn vel undir álagi",
      "Fljótur að læra",
      "Góður í að stjórna og þjálfa",
      "Metnaðarfullur og samviskusamur",
      "Hugsa í lausnum",
      "Stundvís",
      "Þolinmóður",
      "Góður í mannlegum samskiptum",
    ],
    programming: {
      languages:
        "Flutter, Dart, HTML, CSS, Tailwind, Java, Python, JavaScript, C#, TypeScript, React",
      interests: "Mobile app-þróun, vefþróun, gervigreind",
      tools:
        "Visual Studio Code, Android Studio, IntelliJ IDEA, GitHub, Git, Navision, Excel, SharePoint, Teams",
    },
  },
  courses: [
    "Workpoint námskeið - Spektra - 2020",
    "Sala, þjónusta og upplifun námskeið - Guðmundur Páll Gíslason / Birki Ráðgjöf - 2020",
    "Dale Carnegie - 2020",
    "Leiklistarnámskeið Garúnar Janúar - 2020",
    "Stunt Class - Icelandic Stunts - 2019 - Núverandi",
    "Meðstjórnandi Leikfélags Ölfus - 2020 - 2022",
    "EFLING STÉTTARFÉLAG - Trúnaðarráð Eflingar - 2019 - 2021",
    "Þing Starfsgreinasambandsins - 24.-25. október 2019",
    "Trúnaðarmaður í Öryggismiðstöðinni - 2016 - 2019",
    "ÖKU OG VINNUVÉLASKÓLINN - Vinnuvélaréttindi / Stóra vinnuvélaprófið 2013",
  ],
  footerQuote: "Ferilskrá GBB – Gunnar Bersi Björnsso",
};

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black p-8 min-h-screen">
      <div className="max-w-5xl mx-auto bg-gray-900 shadow-2xl rounded-lg overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 text-white text-center py-10 px-6 transition-colors duration-300 hover:bg-gray-500">
          <div className="flex flex-col items-center">
            <img
              src={cvData.header.image}
              alt="Headshot of Gunnar Bersi Björnsso"
              className="w-32 h-32 rounded-full border-4 border-white mb-4 object-cover"
            />
            <h1 className="text-5xl font-extrabold tracking-widest uppercase">
              {cvData.header.title}
            </h1>
            <h2 className="text-2xl mt-3">{cvData.header.name}</h2>
          </div>
        </header>

        <div className="divide-y divide-gray-300">
          {/* Contact Information */}
          <section className="p-6">
            <h3 className="text-2xl font-semibold uppercase tracking-wide mb-5 border-l-4 pl-3 text-gray-300">
              Upplýsingar
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-base text-gray-300">
              <div>
                <p className="font-medium">Sími:</p>
                <p>{cvData.contact.phone}</p>
              </div>
              <div>
                <p className="font-medium">Heimilisfang:</p>
                <p>{cvData.contact.address}</p>
              </div>
              <div>
                <p className="font-medium">Netfang:</p>
                <p>{cvData.contact.email}</p>
              </div>
            </div>
          </section>

          {/* Languages */}
          <section className="p-6">
            <h3 className="text-2xl font-semibold uppercase tracking-wide mb-5 border-l-4 pl-3 text-gray-300">
              Tungumál
            </h3>
            <ul className="list-disc list-inside text-base space-y-1 text-gray-300">
              {cvData.languages.map((lang, index) => (
                <li key={index}>
                  <span className="font-medium">{lang.language}:</span>{" "}
                  {lang.level}
                </li>
              ))}
            </ul>
          </section>

          {/* Work Experience */}
          <section className="p-6">
            <h3 className="text-2xl font-semibold uppercase tracking-wide mb-5 border-l-4 pl-3 text-gray-300">
              Starfsferill
            </h3>
            {cvData.workExperience.map((job, index) => (
              <div key={index} className="mb-8">
                <h4 className="text-xl font-bold text-gray-100">{job.title}</h4>
                <p className="text-gray-500 text-sm">{job.period}</p>
                {job.description && (
                  <p className="mt-3 text-base leading-relaxed text-gray-300">
                    {job.description}
                  </p>
                )}
              </div>
            ))}
          </section>

          {/* Education */}
          <section className="p-6">
            <h3 className="text-2xl font-semibold uppercase tracking-wide mb-5 border-l-4 pl-3 text-gray-300">
              Menntun
            </h3>
            <div className="space-y-4 text-base text-gray-300">
              {cvData.education.map((edu, index) => (
                <div key={index} className="pb-2">
                  {edu.institution && (
                    <p>
                      <span className="font-medium">Stofnun:</span>{" "}
                      {edu.institution}
                    </p>
                  )}
                  {edu.course && (
                    <p>
                      <span className="font-medium">Grein:</span>{" "}
                      {edu.course}
                    </p>
                  )}
                  {edu.period && (
                    <p>
                      <span className="font-medium">Tímabil:</span>{" "}
                      {edu.period}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Recommendations */}
          <section className="p-6">
            <h3 className="text-2xl font-semibold uppercase tracking-wide mb-5 border-l-4 pl-3 text-gray-300">
              Meðmælendur
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base text-gray-300">
              {cvData.Recomendations.map((rec, index) => (
                <div key={index} className="p-4 border border-gray-700 rounded">
                  <p>
                    <span className="font-medium">Nafn:</span> {rec.name}
                  </p>
                  <p>
                    <span className="font-medium">Staða:</span> {rec.title}
                  </p>
                  <p>
                    <span className="font-medium">Sími:</span> {rec.contact}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="p-6">
            <h3 className="text-2xl font-semibold uppercase tracking-wide mb-5 border-l-4 pl-3 text-gray-300">
              Styrkleikar
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base text-gray-300">
              <div>
                <h4 className="font-bold mb-3">Persónulegir styrkleikar</h4>
                <ul className="list-disc list-inside space-y-1">
                  {cvData.skills.strengths.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-3">Forritun og Tól</h4>
                <p>
                  <span className="font-medium">Forritunartungumál:</span>{" "}
                  {cvData.skills.programming.languages}
                </p>
                <p>
                  <span className="font-medium">Áhugi:</span>{" "}
                  {cvData.skills.programming.interests}
                </p>
                <p>
                  <span className="font-medium">Verkfæri:</span>{" "}
                  {cvData.skills.programming.tools}
                </p>
              </div>
            </div>
          </section>

          {/* Courses */}
          <section className="p-6">
            <h3 className="text-2xl font-semibold uppercase tracking-wide mb-5 border-l-4 pl-3 text-gray-300">
              Námskeið
            </h3>
            <ul className="list-disc list-inside text-base space-y-1 text-gray-300">
              {cvData.courses.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center py-6 transition-colors duration-300 hover:bg-gray-500">
          <p className="text-base">{cvData.footerQuote}</p>
        </footer>
      </div>
    </div>
  );
}
