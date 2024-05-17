<?php

Class Banner {
    public $banner_aid;
    public $banner_title_1;
    public $banner_image;
    public $banner_is_active;
    public $banner_description;
    public $banner_btn_title;
    public $banner_btn_title_2;
    public $banner_datetime;
    public $banner_created;

    public $banner_search;

    public $connection;
    public $lastInsertedId;
    public $tblBanner;
    

    public function __construct($db) {
        $this->connection = $db;
        $this->tblBanner = "banner";
    }

    public function create() {
        try {
            $sql = "insert into {$this->tblBanner} ";
            $sql .= "( banner_title_1, ";
            $sql .= "banner_image, ";
            $sql .= "banner_is_active, ";
            $sql .= "banner_description, ";
            $sql .= "banner_btn_title, ";
            $sql .= "banner_btn_title_2, ";
            $sql .= "banner_created, ";
            $sql .= "banner_datetime ) values ( ";
            $sql .= ":banner_title_1, ";
            $sql .= ":banner_image, ";
            $sql .= ":banner_is_active, ";
            $sql .= ":banner_description, ";
            $sql .= ":banner_btn_title, ";
            $sql .= ":banner_btn_title_2, ";
            $sql .= ":banner_created, ";
            $sql .= ":banner_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "banner_title_1" => $this->banner_title_1,
                "banner_image" => $this->banner_image,
                "banner_is_active" => $this->banner_is_active,
                "banner_description" => $this->banner_description,
                "banner_btn_title" => $this->banner_btn_title,
                "banner_btn_title_2" => $this->banner_btn_title_2,
                "banner_created" => $this->banner_created,
                "banner_datetime" => $this->banner_datetime,
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
            $sql .= "from {$this->tblBanner} ";
            $sql .= "order by banner_is_active desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblBanner} ";
            $sql .= "where banner_aid = :banner_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "banner_aid" => $this->banner_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function update()
    {
        try {
            $sql = "update {$this->tblBanner} set ";
            $sql .= "banner_title_1 = :banner_title_1, ";
            $sql .= "banner_image = :banner_image, ";
            $sql .= "banner_description = :banner_description, ";
            $sql .= "banner_btn_title = :banner_btn_title, ";
            $sql .= "banner_btn_title_2 = :banner_btn_title_2, ";
            $sql .= "banner_datetime = :banner_datetime ";
            $sql .= "where banner_aid  = :banner_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "banner_title_1" => $this->banner_title_1,
                "banner_image" => $this->banner_image,
                "banner_description" => $this->banner_description,
                "banner_btn_title" => $this->banner_btn_title,
                "banner_btn_title_2" => $this->banner_btn_title_2,
                "banner_datetime" => $this->banner_datetime,
                "banner_aid" => $this->banner_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblBanner} set ";
            $sql .= "banner_is_active = :banner_is_active, ";
            $sql .= "banner_datetime = :banner_datetime ";
            $sql .= "where banner_aid  = :banner_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "banner_is_active" => $this->banner_is_active,
                "banner_datetime" => $this->banner_datetime,
                "banner_aid" => $this->banner_aid,
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
            $sql .= "from {$this->tblBanner} ";
            $sql .= "where banner_title_1 like :banner_title_1 ";
            $sql .= "order by banner_is_active desc, ";
            $sql .= "banner_title_1 asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "banner_title_1" => "%{$this->banner_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}