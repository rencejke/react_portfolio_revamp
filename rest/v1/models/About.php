<?php

Class About {
    public $about_aid;
    public $about_title;
    public $about_small_title;
    public $about_description_1;
    public $about_description_2;
    public $about_image;
    public $about_is_active;
    public $about_btn_title;
    public $about_datetime;
    public $about_created;

    public $about_search;

    public $connection;
    public $lastInsertedId;
    public $tblAbout;
    

    public function __construct($db) {
        $this->connection = $db;
        $this->tblAbout = "about";
    }

    public function create() {
        try {
            $sql = "insert into {$this->tblAbout} ";
            $sql .= "(about_title, ";
            $sql .= "about_small_title, ";
            $sql .= "about_description_1, ";
            $sql .= "about_description_2, ";
            $sql .= "about_image, ";
            $sql .= "about_is_active, ";
            $sql .= "about_btn_title, ";
            $sql .= "about_created, ";
            $sql .= "about_datetime ) values ( ";
            $sql .= ":about_title, ";
            $sql .= ":about_small_title, ";
            $sql .= ":about_description_1, ";
            $sql .= ":about_description_2, ";
            $sql .= ":about_image, ";
            $sql .= ":about_is_active, ";
            $sql .= ":about_btn_title, ";
            $sql .= ":about_created, ";
            $sql .= ":about_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "about_title" => $this->about_title,
                "about_small_title" => $this->about_small_title,
                "about_description_1" => $this->about_description_1,
                "about_description_2" => $this->about_description_2,
                "about_image" => $this->about_image,
                "about_is_active" => $this->about_is_active,
                "about_btn_title" => $this->about_btn_title,
                "about_created" => $this->about_created,
                "about_datetime" => $this->about_datetime,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }

        return $query;
    }

    public function readAll()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblAbout} ";
            $sql .= "order by about_is_active desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblAbout} ";
            $sql .= "where about_aid = :about_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "about_aid" => $this->about_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function update()
    {
        try {
            $sql = "update {$this->tblAbout} set ";
            $sql .= "about_title = :about_title, ";
            $sql .= "about_small_title = :about_small_title, ";
            $sql .= "about_description_1 = :about_description_1, ";
            $sql .= "about_description_2 = :about_description_2, ";
            $sql .= "about_image = :about_image, ";
            $sql .= "about_btn_title = :about_btn_title, ";
            $sql .= "about_datetime = :about_datetime ";
            $sql .= "where about_aid  = :about_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "about_title" => $this->about_title,
                "about_small_title" => $this->about_small_title,
                "about_description_1" => $this->about_description_1,
                "about_description_2" => $this->about_description_2,
                "about_image" => $this->about_image,
                "about_btn_title" => $this->about_btn_title,
                "about_datetime" => $this->about_datetime,
                "about_aid" => $this->about_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblAbout} set ";
            $sql .= "about_is_active = :about_is_active, ";
            $sql .= "about_datetime = :about_datetime ";
            $sql .= "where about_aid  = :about_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "about_is_active" => $this->about_is_active,
                "about_datetime" => $this->about_datetime,
                "about_aid" => $this->about_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    //new
    public function search()
    {
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from {$this->tblAbout} ";
            $sql .= "where about_title like :about_title ";
            $sql .= "order by about_is_active desc, ";
            $sql .= "about_title_1 asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "about_title_1" => "%{$this->about_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}