const fs = require('fs');
const rn = require('randomatic');

/** 
 * Get All existing numbers
 * 
 *  @param {any} req
 *  @param {any} res
 * 
 */
exports.getNumbers = (req, res) => {
  const filePath = 'data/phoneNumbers.txt';
  fs.access(filePath, fs.constants.F_OK | fs.constants.R_OK, (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.status(200).send({
          message: 'There are no phonNumbers yet!',
        });
        return;
      }
    }

    const data = fs.readFileSync(filePath, 'utf8');

    if (data.length > 0) {
      const phoneNumbers = data.split(',');
      res.status(200).send({
        message: 'phoneNumbers fetched successfully',
        phoneNumbers,
        totalNumbersGenerated: phoneNumbers.length
      });
    } else {
      res.status(200).send({
        message: 'There are no phonNumbers yet!',
      })
    }

  });
};

/** 
 * Creates new unique numbers
 * 
 *  @param {any} req
 *  @param {any} res
 * 
 */
exports.numbersController = (req, res) => {

  const filePath = "data/phoneNumbers.txt";

  const numbersToGenerate = Number(req.body.generateNumber);

  if (numbersToGenerate < 1 || isNaN(numbersToGenerate)) {
    return res.status(400)
      .send({ message: 'Please enter a number greater than 0 ' });
  } 
  if (numbersToGenerate > 50) {
    return res.status(400)
      .send({ message: "Sorry!, you can't generate more than 50 numbers at a time"});
  }

    const generatedNumbers = [];

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
            if (exitingNumbers[0] === '') {
              exitingNumbers.splice(0, 1);
            }
              const filteredGeneratedNumbers = generatedNumbers.filter(num => exitingNumbers.indexOf(num) === -1);
    
              const allNumbers = exitingNumbers.concat(filteredGeneratedNumbers);
  
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
};

/** 
 * Helper that saves number to file
 * 
 *  @param {any} req
 *  @param {any} res
 *  @param {array} numbers
 * 
 */
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

