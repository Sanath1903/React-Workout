import React, { useState, useEffect } from 'react'

export default function ViewWorkouts() {

  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/workouts')
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        setWorkouts(data)
      })
  }, [])

  const deleteWorkout = (id) => {

    let fileteredWorkouts = workouts.filter((workout) => workout.id != id)

    fetch('http://localhost:8000/workouts/' + id, {
      method: "DELETE"
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data)
        setWorkouts(fileteredWorkouts)
      })
    }

  const startTime = (id) => {



    // console.log('Add workout.. ',  time)



    //http post



    fetch('http://localhost:8000/workouts/' + id, {



      method: 'PATCH',



      headers: {



        'Content-type': 'application/json'



      },



      body: JSON.stringify({ startTime: new Date() })



    })
  }

  const EndTime = (id, startTime, cb) => {


    let EndTime = new Date();

    let Totalcaloriesburn = getDifferenceInMinutes(new Date(startTime), EndTime, cb);


    console.log(Totalcaloriesburn);


    fetch('http://localhost:8000/workouts/' + id, {


        method: 'PATCH',

        headers: {

            'Content-type': 'application/json'

        },

        body: JSON.stringify({ EndTime, TotalCalories: Totalcaloriesburn })

    })

        .then(res => {
            console.log(res);
        })

}

   function getDifferenceInMinutes(startTime, EndTime, cb) {



            const diffInCal = Math.abs((EndTime - startTime) * cb);
    
    
    
            return diffInCal / (1000 * 60);
    
    
    
        }

  let workoutList = workouts.map((workout) => {
    return (
      <tr key={workout.id}>
        <th scope="row">{workout.id}</th>
        <th scope="row">{workout.title}</th>
        <td>{workout.cb}</td>
        <td>{workout.description}</td>
        <td><button onClick={() => deleteWorkout(workout.id)} className='btn btn-danger'> DELETE... </button></td>
        <td><button onClick={() => startTime(workout.id)} className='btn btn-info'> StartTime </button></td>
        <td><button onClick={() => EndTime(workout.id,workout.startTime,workout.cb)} className='btn btn-dark'> EndTime </button></td>
        <td>{workout.TotalCalories}</td>
      </tr>
    )
  })


  return (
    <table className="table table-success table-striped">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">TITLE</th>
          <th scope="col">CALORIES-BURN</th>
          <th scope="col">DESCRIPTION</th>
          <th scope="col">DELETE WORKOUT</th>
          <th scope="col">START-TIME</th>
          <th scope="col">END-TIME</th>
          <th scope="col">TOTAL-CALORIES</th>

        </tr>
      </thead>
      <tbody>
        {workoutList}
      </tbody>
    </table>
  )
}