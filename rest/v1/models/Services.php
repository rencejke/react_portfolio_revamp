<?php

Class Services {
    public $services_aid;
    public $services_type;
    public $services_image;
    public $services_description;
    public $services_is_active;
    public $services_btn_title;
    public $services_datetime;
    public $services_created;

    public $services_search;

    public $connection;
    public $lastInsertedId;
    public $tblServices;
    

    public function __construct($db) {
        $this->connection = $db;
        $this->tblServices = "services";
    }

    public function create() {
        try {
            $sql = "insert into {$this->tblServices} ";
            $sql .= "(services_type, ";
            $sql .= "services_image, ";
            $sql .= "services_description, ";
            $sql .= "services_is_active, ";
            $sql .= "services_btn_title, ";
            $sql .= "services_created, ";
            $sql .= "services_datetime ) values ( ";
            $sql .= ":services_type, ";
            $sql .= ":services_image, ";
            $sql .= ":services_description, ";
            $sql .= ":services_is_active, ";
            $sql .= ":services_btn_title, ";
            $sql .= ":services_created, ";
            $sql .= ":services_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "services_type" => $this->services_type,
                "services_image" => $this->services_image,
                "services_description" => $this->services_description,
                "services_is_active" => $this->services_is_active,
                "services_btn_title" => $this->services_btn_title,
                "services_created" => $this->services_created,
                "services_datetime" => $this->services_datetime,
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
            $sql .= "from {$this->tblServices} ";
            $sql .= "order by services_is_active desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblServices} ";
            $sql .= "where services_aid = :services_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "services_aid" => $this->services_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function update()
    {
        try {
            $sql = "update {$this->tblServices} set ";
            $sql .= "services_type = :services_type, ";
            $sql .= "services_image = :services_image, ";
            $sql .= "services_description= :services_description, ";
            $sql .= "services_btn_title = :services_btn_title, ";
            $sql .= "services_datetime = :services_datetime ";
            $sql .= "where services_aid  = :services_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "services_type" => $this->services_type,
                "services_image" => $this->services_image,
                "services_description" => $this->services_description,
                "services_btn_title" => $this->services_btn_title,
                "services_datetime" => $this->services_datetime,
                "services_aid" => $this->services_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblServices} set ";
            $sql .= "services_is_active = :services_is_active, ";
            $sql .= "services_datetime = :services_datetime ";
            $sql .= "where services_aid  = :services_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "services_is_active" => $this->services_is_active,
                "services_datetime" => $this->services_datetime,
                "services_aid" => $this->services_aid,
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
            $sql .= "from {$this->tblServices} ";
            $sql .= "where services_title like :services_title ";
            $sql .= "order by services_is_active desc, ";
            $sql .= "services_title_1 asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "services_title_1" => "%{$this->services_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}