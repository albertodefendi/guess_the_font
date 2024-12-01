import "./App.css";
import Input from "./components/Input";

const title = "Guess The Font"

export default function App() {

  return (
    <>
      <div className="bg-pink-950 h-screen flex justify-center items-center">
        <div className="grid gap-24 max-w-[50%]">
          <h1 className="text-6xl text-white text-center">
            {title.split("").map((letter, index) => (
              <span className="mx-1" key={index}>{letter}</span>
            ))}
          </h1>
          <div className="bg-white w-full rounded-3xl p-8 text-center text-3xl">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo esse accusamus quasi magni totam? Nesciunt, harum!</div>
          <Input></Input>
        </div>
      </div>
    </>
  )
}
