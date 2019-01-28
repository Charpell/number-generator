const fs = require('fs');
const rn = require('randomatic');

exports.numbersController = (req, res) => {

  const filePath = "data/phoneNumbers.txt";

  const numbersToGenerate = Number(req.body.generateNumber);

  if (numbersToGenerate < 1) {
    res.status(400).send({ message: 'Please enter number greater than 0 ' });
  } else {

    const generatedNumbers = [];
    let totalNumbersGenerated;

    for (let i = 1; i <= numbersToGenerate; i++) {
      const newNumber = `0${rn('0', 9)}`;
      generatedNumbers.push(newNumber);
    }

    fs.stat(filePath, (err, stat) => {
      //  if null means file exists
      if (err == null) {
        // Read File in
        fs.readFile(filePath, 'utf-8', (error, data) => {
          if (error) throw error;

          const exitingNumbers = data.split(',');
          const filteredGeneratedNumbers = generatedNumbers.filter(num => exitingNumbers.indexOf(num) === -1);

          const allNumbers = exitingNumbers.concat(filteredGeneratedNumbers);
          totalNumbersGenerated = allNumbers.length;

          // write numbers  to file
          saveNumbersToFile(req, res, allNumbers);
        });
      }
      else if (err.code === 'ENOENT') {
        saveNumbersToFile(req, res, generatedNumbers);
      } else {
        res.status(500).send({
          message: 'This is definitely some other error!!' + err.code
        });
      }
    });
  }

};

const saveNumbersToFile = (req, res, numbers) => {
  const filePath = "data/phoneNumbers.txt";

  let numbersToSave = numbers.join();

  fs.writeFileSync(filePath, numbersToSave);

  res.status(201).send({
    message: 'generated successfully',
    phoneNumbers: numbers,
    totalNumbersGenerated: numbers.length
  });
};


// module.exports = numbersController;
