<?php

Class Cta {
    public $cta_aid;
    public $cta_title;
    public $cta_msg;
    public $cta_is_active;
    public $cta_btn_title;
    public $cta_datetime;
    public $cta_created;

    public $cta_search;

    public $connection;
    public $lastInsertedId;
    public $tblCta;
    

    public function __construct($db) {
        $this->connection = $db;
        $this->tblCta = "cta";
    }

    public function create() {
        try {
            $sql = "insert into {$this->tblCta} ";
            $sql .= "(cta_title, ";
            $sql .= "cta_msg, ";
            $sql .= "cta_is_active, ";
            $sql .= "cta_btn_title, ";
            $sql .= "cta_created, ";
            $sql .= "cta_datetime ) values ( ";
            $sql .= ":cta_title, ";
            $sql .= ":cta_msg, ";
            $sql .= ":cta_is_active, ";
            $sql .= ":cta_btn_title, ";
            $sql .= ":cta_created, ";
            $sql .= ":cta_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "cta_title" => $this->cta_title,
                "cta_msg" => $this->cta_msg,
                "cta_is_active" => $this->cta_is_active,
                "cta_btn_title" => $this->cta_btn_title,
                "cta_created" => $this->cta_created,
                "cta_datetime" => $this->cta_datetime,
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
            $sql .= "from {$this->tblCta} ";
            $sql .= "order by cta_is_active desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblCta} ";
            $sql .= "where cta_aid = :cta_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "cta_aid" => $this->cta_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function update()
    {
        try {
            $sql = "update {$this->tblCta} set ";
            $sql .= "cta_title = :cta_title, ";
            $sql .= "cta_msg = :cta_msg, ";
            $sql .= "cta_btn_title = :cta_btn_title, ";
            $sql .= "cta_datetime = :cta_datetime ";
            $sql .= "where cta_aid  = :cta_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "cta_title" => $this->cta_title,
                "cta_msg" => $this->cta_msg,
                "cta_btn_title" => $this->cta_btn_title,
                "cta_datetime" => $this->cta_datetime,
                "cta_aid" => $this->cta_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblCta} set ";
            $sql .= "cta_is_active = :cta_is_active, ";
            $sql .= "cta_datetime = :cta_datetime ";
            $sql .= "where cta_aid  = :cta_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "cta_is_active" => $this->cta_is_active,
                "cta_datetime" => $this->cta_datetime,
                "cta_aid" => $this->cta_aid,
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
            $sql .= "from {$this->tblCta} ";
            $sql .= "where cta_title like :cta_title ";
            $sql .= "order by cta_is_active desc, ";
            $sql .= "cta_title_1 asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "cta_title_1" => "%{$this->cta_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}