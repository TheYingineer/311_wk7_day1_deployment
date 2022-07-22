DROP TABLE IF EXISTS games; CREATE TABLE games ( 
      -- id VARCHAR(255) PRIMARY KEY NOT NULL,  
       id INT AUTO_INCREMENT PRIMARY KEY,  
       title VARCHAR(255) NOT NULL,   
       release_year INT NOT NULL,   
       box_art VARCHAR(255) NOT NULL,   
       description TEXT,   
       trailer VARCHAR(255),
       hero VARCHAR(255),
       developer VARCHAR(255)
);

