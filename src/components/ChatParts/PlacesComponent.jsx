import { Container } from "@mui/material";

const Places = (props) => {
  console.log(props.data);
  return (
    <Container>
      <h1>We Recommend This Location</h1>
      <h1>{props.data.name}</h1>
      <h1>{props.data.vicinity}</h1>
    </Container>
  );
};

export default Places;
