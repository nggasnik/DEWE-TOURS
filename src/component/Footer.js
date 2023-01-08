const Footer = () => {
  return (
    <footer className="w-100 position-absolute bottom-0" style={{ height: 54 }}>
      <div
        xs={11}
        style={{ width: "95%" }}
        className="bg-warning h-100 d-flex flex-column justify-content-center"
      >
        <p
          className="text-center text-white p-0 m-0"
          style={{ fontSize: 18, fontWeight: "400" }}
        >
          Copyright &copy; جالس أهل الصدق والوفاءجالس أهل الصدق والوفاء
          
        </p>
      </div>
      <div
        className="position-absolute end-0 bottom-0"
        style={{
          width: "7%",
        }}
      >
        <img src="/img/leaf-footer.png" alt="leaf footer" className="w-100" />
      </div>
    </footer>
  );
};

export default Footer;
