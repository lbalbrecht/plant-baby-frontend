import React from "react";
import "./style.css";
import API from "../../utils/Api";
import FileBase64 from "react-file-base64";
import PlantCard from "../PlantCard/index";

export default class ImageUpload extends React.Component {
  constructor() {
    super();
    this.state = {
      files: [],
      originalImage: "",
      wikiDescription: "",
      plantName: "",
      plantImageURL: "",
      wikiURL: "",
      inventory: "",
    };
  }

  getFiles(files) {
    this.setState({ files: files });
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      API.imageLoad(file)
        .then((res) => {
          console.log(res);
          console.log(res.dataRes);
          this.setState({
            originalImage: res.dataRes.images[0].url,
            wikiDescription:
              res.dataRes.suggestions[0].plant_details.wiki_description.value,
            plantName: res.dataRes.suggestions[0].plant_name,
            plantImageURL:
              res.dataRes.suggestions[0].similar_images[0].url_small,
            wikiURL: res.dataRes.suggestions[0].plant_details.url,
          });
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      API.getUser(token)
        .then((res) => {
          // console.log(res.data.id)
          const id = res.data.id;
          API.getInventory(id, token).then((res) => {
            // console.log(res.data.inventory.id)
            this.setState({
              inventory: res.data.inventory.id,
            });
            // console.log(inventoryState)
          });
        })
        .catch((err) => {
          console.log("error: ", err);
        });
    }
  }

  onClick = () => {
    const token = localStorage.getItem("token");
    const inventId = this.state.inventory;
    const plantData = {
      image_file: this.state.originalImage,
      description: this.state.wikiDescription,
      type: this.state.plantName,
      inventory_id: inventId,
    };
    console.log(inventId);
    console.log(this.state);
    console.log(token);
    API.createPlant(plantData, token)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  render() {
    return (
      <div>
        <div className="text-center mt-25">
          <p className="text-center">
            Load an image to get back a card of your plant.
          </p>
          <FileBase64 multiple={true} onDone={this.getFiles.bind(this)} />
        </div>

        <PlantCard
          originalImage={this.state.originalImage}
          plantName={this.state.plant_name}
          wikiDescription={this.state.wikiDescription}
          wikiURL={this.state.wikiURL}
          onClick={this.onClick}
        />
      </div>
    );
  }
}
