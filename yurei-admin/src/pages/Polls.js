import { LeafPoll} from 'react-leaf-polls'
import 'react-leaf-polls/dist/index.css'

// Persistent data array (typically fetched from the server)
const resData = [
  { id: 0, text: 'Katori', votes: 0 },
  { id: 1, text: 'Boss', votes: 0 },
]

// Object keys may vary on the poll type (see the 'Theme options' table below)
const customTheme = {
  textColor: 'black',
  mainColor: '#00B87B',
  backgroundColor: 'rgb(255,255,255)',
  alignment: 'center',
}

const vote = (item, results) => {
  // Here you probably want to manage
  // and return the modified data to the server.
  console.log("res", results)
  console.log("item", item)
}

const Polls = () => {
    return (
      <LeafPoll
        type='multiple'
        question='Ai đẹp trai hơn?'
        results={resData}
        theme={customTheme}
        onVote={vote}
        isVoted={false}
      />
    )
  }
  
export default Polls