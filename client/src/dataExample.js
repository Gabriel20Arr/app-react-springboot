const dataExample = Array.from({ length: 5 }, (_, i) => ({
    Id: i + 1,
    Name: `Test ${i + 1}`,
    Email: `Test${i + 1}@example.com`,
    Adress: `${i + 132 + Math.floor(Math.random() * 100)}`,
    Genero: i % 2 === 0 ? "Femenino" : "Masculino",
    Role: i % 2 === 0 ? "Admin" : "User",
}));

export default dataExample;