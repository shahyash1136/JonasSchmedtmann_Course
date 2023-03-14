class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  //1A)NOTE: Filtering
  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    //1B)NOTE: Advance Filtering
    let queryStr = JSON.stringify(queryObj);
    //NOTE: Will replace gte,gt,lte,lt
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  //2)NOTE: Sorting
  sort() {
    if (this.queryString.sort) {
      /* NOTE: pass - in query to sort it in accesding order 
      Eg sort=-price
      if want to sort with multiple values pass a value with coma seprated.
      Eg sort=-price,-ratingsAverage
      */
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  //3)NOTE: Field Limiting
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      /* NOTE: pass - in query to exclude it from the data */
      this.query = this.query.select('-__v');
    }
    return this;
  }

  //4)NOTE: Pagination
  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
