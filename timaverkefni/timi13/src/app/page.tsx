"use client";

type FirstNameProps = {
  firstname: string;
  middlename: string;
  lastname: string;
};

const FullName = ({firstname, middlename, lastname}: FirstNameProps) => {
  return (
    <div>
      <p>{firstname}</p> 
      <p>{middlename} </p> 
      <p> {lastname}</p> 
      
    </div>
  );
};

const Home= () => {
  const Name = {
    firstname: 'Gunnar',
    middlename: 'Bersi',
    lastname: 'Björnsson'
  };
  return (
    <div ClassName= "bg-blue-900">
      <FullName {...Name} />
    </div>
  );
};
export default Home;