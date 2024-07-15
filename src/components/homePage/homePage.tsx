import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import './homePage.css';
import angpaoImg from "../../assets/images/angpao.png";

const schema = yup.object().shape({
  amount: yup.number()
  .transform((val, orig) => orig === "" ? undefined : val)
  .required("Please enter an amount")
  .min(1, "Amount must be greater than or equal to 1"),
  participants: yup.number()
  .transform((val, orig) => orig === "" ? undefined : val)
  .required("Please enter the number of participants")
  .min(1, "Number of participants must be greater than or equal to 1")
  .max(100, "Number of participants must be less than or equal to 100")
});

function Home() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const navigate = useNavigate();

  const distributeAmount: any = (participants: number, amount: number) => {
    if (participants <= 1) return [parseFloat(amount.toFixed(2))];
    let half = Math.floor(participants / 2);
    let randomAmount = parseFloat((Math.random() * amount).toFixed(2));
    return distributeAmount(half, randomAmount).concat(distributeAmount(participants-half, amount-randomAmount));
  }

  const onSubmitHandler = (data: any) => {
    const angpaoAmount = data.amount;
    const numParticipants = data.participants;
    const distributed = distributeAmount(numParticipants, angpaoAmount);
    navigate("../result", {replace: true, state: {result: distributed}})
    reset();
  }; 

  return (
    <div className="homePage">
      <header className="home-header">
        <h1>Angpao Distribution</h1>
        <img src={angpaoImg} alt="angpao" id="angpaoImg"/>
      </header>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <label htmlFor="amount">Angpao Amount: </label>
        <input id="amount" type="number" {...register("amount")}/>
        {errors.amount &&
          <p>{errors.amount.message}</p>
        }
        <label htmlFor="participants">Number of Participants: </label>
        <input id="participants" type="number" {...register("participants")}/>
        {errors.participants &&
          <p>{errors.participants.message}</p>
        }
        <input type="submit" value="Distribute Angpao"/>
      </form>
    </div>
    
  );
}

export default Home;
