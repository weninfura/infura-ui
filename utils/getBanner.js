export default typeof process.env.REACT_APP_BANNER === 'undefined'
  ? []
  : JSON.parse(process.env.REACT_APP_BANNER)
      .records.filter(record => Object.keys(record.fields).length > 0)
      .sort((a, b) => new Date(b.fields.releaseDate) - new Date(a.fields.releaseDate));
