type ExampleType = {
  name: string;
  email: string;
}

export const handler = async (event) => {
  return {
    statusCode: 200,
    body: 'hello world of ts'
  }
}