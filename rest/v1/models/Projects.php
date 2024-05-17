<?php

Class Projects {
    public $projects_aid;
    public $projects_title;
    public $projects_num;
    public $projects_image;
    public $projects_description;
    public $projects_is_active;
    public $projects_btn_title;
    public $projects_animation;
    public $projects_datetime;
    public $projects_created;

    public $projects_search;

    public $connection;
    public $lastInsertedId;
    public $tblProjects;
    

    public function __construct($db) {
        $this->connection = $db;
        $this->tblProjects = "projects";
    }

    public function create() {
        try {
            $sql = "insert into {$this->tblProjects} ";
            $sql .= "( projects_num, ";
            $sql .= "projects_title, ";
            $sql .= "projects_image, ";
            $sql .= "projects_description, ";
            $sql .= "projects_is_active, ";
            $sql .= "projects_btn_title, ";
            $sql .= "projects_animation, ";
            $sql .= "projects_created, ";
            $sql .= "projects_datetime ) values ( ";
            $sql .= ":projects_num, ";
            $sql .= ":projects_title, ";
            $sql .= ":projects_image, ";
            $sql .= ":projects_description, ";
            $sql .= ":projects_is_active, ";
            $sql .= ":projects_btn_title, ";
            $sql .= ":projects_animation, ";
            $sql .= ":projects_created, ";
            $sql .= ":projects_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "projects_num" => $this->projects_num,
                "projects_title" => $this->projects_title,
                "projects_image" => $this->projects_image,
                "projects_description" => $this->projects_description,
                "projects_is_active" => $this->projects_is_active,
                "projects_btn_title" => $this->projects_btn_title,
                "projects_animation" => $this->projects_animation,
                "projects_created" => $this->projects_created,
                "projects_datetime" => $this->projects_datetime,
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
            $sql .= "from {$this->tblProjects} ";
            $sql .= "order by projects_is_active desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblProjects} ";
            $sql .= "where projects_aid = :projects_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "projects_aid" => $this->projects_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function update()
    {
        try {
            $sql = "update {$this->tblProjects} set ";
            $sql .= "projects_num = :projects_num, ";
            $sql .= "projects_title = :projects_title, ";
            $sql .= "projects_image = :projects_image, ";
            $sql .= "projects_description = :projects_description, ";
            $sql .= "projects_btn_title = :projects_btn_title, ";
            $sql .= "projects_animation = :projects_animation, ";
            $sql .= "projects_datetime = :projects_datetime ";
            $sql .= "where projects_aid  = :projects_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "projects_num" => $this->projects_num,
                "projects_title" => $this->projects_title,
                "projects_image" => $this->projects_image,
                "projects_description" => $this->projects_description,
                "projects_btn_title" => $this->projects_btn_title,
                "projects_animation" => $this->projects_animation,
                "projects_datetime" => $this->projects_datetime,
                "projects_aid" => $this->projects_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblProjects} set ";
            $sql .= "projects_is_active = :projects_is_active, ";
            $sql .= "projects_datetime = :projects_datetime ";
            $sql .= "where projects_aid  = :projects_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "projects_is_active" => $this->projects_is_active,
                "projects_datetime" => $this->projects_datetime,
                "projects_aid" => $this->projects_aid,
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
            $sql .= "from {$this->tblProjects} ";
            $sql .= "where projects_title like :projects_title ";
            $sql .= "order by projects_is_active desc, ";
            $sql .= "projects_title asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "projects_title" => "%{$this->projects_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}