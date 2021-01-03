# Shamir's Secret

This is a CLI application which implements the Shamir's Secret Sharing Algorithm.

## Usage

### To share a secret

- Edit the `input.txt` file and add the numbers you want to share (seperated by a new line). Example:

  ```
  546
  125
  786
  745
  .
  .
  .
  ```

- Run the command to generate the shares. `npm run generate`

- The program will create a file `shares.txt` which will contain all `4` shares which you can share to 4 different people.

### To combine the shares

- Edit the `input.txt` file and add the shares you want to combine (seperated by 2 new lines). Example:

  ```
  54, 661
  53, 684
  32, 51
  14, 511
  234, 76

  12, 654
  786, 54
  64, 650
  61, 645
  165, 89
  ```

- Run the command to generate the secret. `npm run combine`

- The program will create a file `shares.txt` which will contain all `4` shares which you can share to 4 different people.
