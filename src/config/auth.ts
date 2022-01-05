export default {
  jwt: {
    secret: process.env.APP_SECRET,
    // secret: 'ca7593c4dbc6c144b17a13ada118adbc', // deixar assim quando for rodar jest
    expiresIn: '1d',
  },
};
