import Header from "../../_components/Header";


export default function BookingLayout({
  children,
}) {
  return (
    <>
      <Header></Header>
      <div className="container my-6">{children}</div>      
    </>
  );
}
