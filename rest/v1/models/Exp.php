<?php

Class Exp {
    public $exp_aid;
    public $exp_image;
    public $exp_image_animation;
    public $exp_is_active;
    public $exp_datetime;
    public $exp_created;

    // public $exp_search;

    public $connection;
    public $lastInsertedId;
    public $tblExp;
    

    public function __construct($db) {
        $this->connection = $db;
        $this->tblExp = "exp";
    }

    public function create() {
        try {
            $sql = "insert into {$this->tblExp} ";
            $sql .= "(exp_image, ";
            $sql .= "exp_image_animation, ";
            $sql .= "exp_is_active, ";
            $sql .= "exp_created, ";
            $sql .= "exp_datetime ) values ( ";
            $sql .= ":exp_image, ";
            $sql .= ":exp_image_animation, ";
            $sql .= ":exp_is_active, ";
            $sql .= ":exp_created, ";
            $sql .= ":exp_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "exp_image" => $this->exp_image,
                "exp_image_animation" => $this->exp_image_animation,
                "exp_is_active" => $this->exp_is_active,
                "exp_created" => $this->exp_created,
                "exp_datetime" => $this->exp_datetime,
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
            $sql .= "from {$this->tblExp} ";
            $sql .= "order by exp_is_active desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblExp} ";
            $sql .= "where exp_aid = :exp_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "exp_aid" => $this->exp_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function update()
    {
        try {
            $sql = "update {$this->tblExp} set ";
            $sql .= "exp_image = :exp_image, ";
            $sql .= "exp_image_animation = :exp_image_animation, ";
            $sql .= "exp_datetime = :exp_datetime ";
            $sql .= "where exp_aid  = :exp_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "exp_image" => $this->exp_image,
                "exp_image_animation" => $this->exp_image_animation,
                "exp_datetime" => $this->exp_datetime,
                "exp_aid" => $this->exp_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblExp} set ";
            $sql .= "exp_is_active = :exp_is_active, ";
            $sql .= "exp_datetime = :exp_datetime ";
            $sql .= "where exp_aid  = :exp_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "exp_is_active" => $this->exp_is_active,
                "exp_datetime" => $this->exp_datetime,
                "exp_aid" => $this->exp_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    //new
    // public function search()
    // {
    //     try {
    //         $sql = "select ";
    //         $sql .= "* ";
    //         $sql .= "from {$this->tblExp} ";
    //         $sql .= "where exp_title like :exp_title ";
    //         $sql .= "order by exp_is_active desc, ";
    //         $sql .= "exp_title asc ";
    //         $query = $this->connection->prepare($sql);
    //         $query->execute([
    //             "exp_title" => "%{$this->exp_search}%",
    //         ]);
    //     } catch (PDOException $ex) {
    //         $query = false;
    //     }
    //     return $query;
    // }
}