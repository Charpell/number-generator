const rn = require('randomatic');
const fs = require('fs');

exports.numbersController = (req, res) => {

  const numbersToGenerate = Number(req.body.generateNumber) || 10;

  if (numbersToGenerate < 1) {
    res.status(400).send({ message: 'Please enter number greater than 0 ' });
  }

  const generatedNumbers = [];
  let totalNumbersGenerated;

  for (let i = 1; i <= numbersToGenerate; i++) {
    const newNumber = `0${rn('0', 9)}`;
    generatedNumbers.push(newNumber);
  }

  fs.stat('phoneNumbers.csv', (err, stat) => {
    //  if null means file exists
    if (err == null) {
      // Read File in
      fs.readFile('phoneNumbers.csv', 'utf-8', (error, data) => {
        if (error) throw error;

        const exitingNumbers = data.split(',');
        const filteredGeneratedNumbers = generatedNumbers.filter(num => exitingNumbers.indexOf(num) === -1);

        const allNumbers = exitingNumbers.concat(filteredGeneratedNumbers);
        totalNumbersGenerated = allNumbers.length;
        console.log(totalNumbersGenerated);

        // write numbers 
        fs.writeFileSync('phoneNumbers.csv', allNumbers.join());

        res.status(201).send({
          message: 'generated successfully',
          phoneNumbers: allNumbers,
          totalNumbersGenerated
        });
      });
    }
    else if (err.code === 'ENOENT') {
      fs.writeFileSync('phoneNumbers.csv', generatedNumbers.join());

      res.status(201).send({
        message: 'generated successfully',
        phoneNumbers: generatedNumbers,
        totalNumbersGenerated: generatedNumbers.length
      });

    } else {
      res.status(500).send({
        message: 'This is definitely some other error!!' + err.code
      });
    }
  });

};
