import EmployeeList from "@/components/EmployeeList";

const employees = ({ data }) => {
  return (
    <div>
      <EmployeeList employeeData={data} />
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/employee");
  const data = await res.json();

  return {
    props: { data },
  };
}

export default employees;
