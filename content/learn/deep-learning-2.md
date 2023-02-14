---
title: CNN
description: 'Convolutional Neural Networks (CNN) are characterized by the presence of Convolutional layers, used to extract features from the input data, pooling layers to reduce the spatial resolution of the data, and fully-connected layers to produce the final output. CNNs have been very successful in computer vision tasks, such as object recognition and image classification.'
topics: []
acronyms: [
    ['FFNN', 'Feedforward NN'],
    ['FCNN', 'Fully Convolutional NN'],
    ['CNN', 'Convolutional NN'],
    ['RNN', 'Recurrent NN'],
    ['NN', 'Neural Network'],
    ['ML', 'Machine Learning'],
    ['DL', 'Deep Learning'],
    ['FC', 'Fully Connected'],
    ['MLP', 'Multi-Layer Perceptron (FFNN)'],
    ['GAP', 'Global Average Pooling'],
    ['OD', 'Object Detection'],
    ['RPN', 'Region Proposal Network'],
    ['ROI', 'Region of Interest'],
    ['AE', 'Autoencoder'],
    ['NLP', 'Neural Language Processing'],
    ['GAN', 'Generative Adversarial Network'],
    ['ie', 'that is (id est)'],
    ['eg', 'for example (exempli gratia)'],
    ['wrt', 'with respect to'],
    ['e2e', 'end-to-end'],
]
color: 'green darken-2'
---

# CNN
Convolutional Neural Networks (CNN) are characterized by the presence of Convolutional layers, used to extract features from the input data, pooling layers to reduce the spatial resolution of the data, and fully-connected layers to produce the final output. CNNs have been very successful in computer vision tasks, such as object recognition and image classification.

<card-disclaimer title="Source" short="Polimi course" course="Artificial Neural Networks and Deep Learning"></card-disclaimer>

<card-disclaimer title="Format" short="Q+A"></card-disclaimer>

<card-disclaimer title="Words and colors" short="Acronyms" :colors="['def','pro','con']"></card-disclaimer>

### Convolution
* **Why convolution?**
    * <span style="text-decoration:underline;">Sparse connectivity</span> (not FC, kernel is smaller than input, so less params and faster and dim reduction)
    * <span style="text-decoration:underline;">Parameter sharing</span> (the same kernel is used for all input positions, learn only one, faster)
    * <span style="text-decoration:underline;">Equivariant representations</span> (it's invariant to input translation thanks to param sharing)
* **How do you handle the input of variable sized images in CNNs?**
* **What is the Inception Net module?**
    * It reduces computational load of the network, by reducing conv inputs by 1x1 conv layers before bigger convs.
    * It uses multiple conv filters of different sizes in parallel.
* <md-icon>mdi-check</md-icon> **True:** CNN can be seen as a special MLP network, having shared weights and sparse connectivity.

<br>

### GlobalAvgPooling
* **What does GAP do?**
  * It is a pooling operation. The <h-def>GAP</h-def> layer takes in the activations from the final convolutional layer and reduces the spatial dimensions of the feature map by computing the average of the activations across all positions. This results in a single feature vector that represents the whole image.
  * <h-pro><md-icon>mdi-check-circle-outline</md-icon> It reduces overfitting, makes the network more robust to translations, and reduces the number of parameters in the model. Additionally, it provides a compact representation of the image and helps the network to focus on the most important features in the image, which helps to improve the accuracy of the model</h-pro>.
* **Where do you usually put GAP?**
  * In a CNN it's typically used between the convolutional part and the final FC part.
* **What's the key difference with Max Pooling? Just average vs max?**
  * No! Max Pooling works on each feature map independently, thus outputs the same depth dimension (but reduced height and width), while GAP averages all features so it outputs depth 1 (keeping same height and width)!
* <md-icon>mdi-check</md-icon> **True**: GAP has no trainable params / GAP can be used in networks containing a batchnorm layer / GAP is not used in OD networks / networks provided with GAP need to be trained to return class activation mapping / including a GAP in a CNN is a good way to make the CNN invariant to input size

<br>

### Segmentation
* **What is segmentation?**
    * like assigning a label to each pixel of the image.
* **What's the difference between instance segmentation and semantic segmentation?**
    * Instance segmentation finds objects and assigns labels.
    * Semantic segmentation is a subclass of instance segmentation that treats multiple objects of the same category as one entity.
* **How to?**
    * The most basic way is to produce a <span style="text-decoration:underline;">heatmap</span> from the last volume of a classification network. This is not ideal since the prediction will be very coarse (low resolution in deep levels due to convolutions). How to extract high-level info (global info, have to go deep) but maintain resolution (local info)?
    * Upsampling by <span style="text-decoration:underline;">TransposeConv</span>: the same filter can also perform the inverse operation (upsample), it can be trained from scratch to perform upsampling
    * Patch-based and fullimage-based:   ... 
    * Best is U-net:
* **What is a U-Net?**
  * A <h-def>U-Net</h-def> is a type of FCNN used for semantic segmentation, medical imaging, and other dense prediction tasks. It has a unique architecture that consists of a contracting path, where the spatial dimensions of the feature map are reduced, and an expanding path, where the spatial dimensions are increased. This allows the U-Net to capture both high-level semantic information and fine-grained details in the image.
* **How does U-Net work?**
    * The <span style="text-decoration:underline;">contracting</span> path follows the typical architecture of a CNN. It consists of the repeated application of two 3x3 convolutions (unpadded convolutions), each followed by a ReLU and a 2x2 max pooling operation with stride 2 for downsampling. At each downsampling step we double the number of feature channels.
    * Every step in the <span style="text-decoration:underline;">expansive</span> path consists of an upsampling of the feature map followed by a 2x2 convolution (“up-convolution”) that halves the number of feature channels, a <span style="text-decoration:underline;">concatenation</span> with the correspondingly cropped feature map from the contracting path, and two 3x3 convolutions, each followed by a ReLU.
    * The <span style="text-decoration:underline;">cropping</span> is necessary due to the loss of border pixels in every convolution. At the final layer a 1x1 convolution is used to map each 64-component feature vector to the desired number of classes. The network has 23 conv layers in total.
        <md-img src="/learn/deep-learning_unet.jpg" width="500"></md-img>
    * Note that the net is symmetric, and that the skip connections are used in the upsampling path, they're concatenated and mixed in a learnable manner using convolution!
    * _Combining fine layers and coarse layers lets the model make <span style="text-decoration:underline;">local</span> predictions that respect <span style="text-decoration:underline;">global</span> structure._
* <md-icon>mdi-check</md-icon> **True**: InstanceSegm network returns both segments and bounding boxes / architectures for semantic segmentation can have a shape similar to a convolutional autoencoder
* <md-icon>mdi-close</md-icon> **False**: InstSegm and SemSegm are different problems solved by the same networks / in order to train a InstSegm network, it is necessary to finetune a SemSegm network first / Fully convolutionalization is a way to modify without training a classifier, to become a (very coarse) InstSegm network

<br>

### Object Detection
* **What is <h-def>OD</h-def>?**
    * It means detecting an object in an image. In particular, give 4 coordinates of the bounding box containing that object, and the label associated to that object.
* **How to OD?**
    * The most basic solution is to use a <span style="text-decoration:underline;">sliding window</span>. This is easy since we already have CNN to perform classification of the image frame, but it's too inefficient.
    * A step further is <span style="text-decoration:underline;">R-CNN</span>, that adds a step before CNN (ROI algo) in an attempt to propose regions of interest (ROI) instead of trying all possible regions blindly. This is still quite inefficient and it's not an end2end detection network.
    * <span style="text-decoration:underline;">Fast R-CNN</span> are an improvement, since it projects proposed regions into the feature map, making it an e2e algo, with backprop and faster training.
    * <span style="text-decoration:underline;">Faster R-CNN</span> instead train a RegionProposalNetwork (RPN) instead of using a basic ROI algo.
* **How does RPN work?**
    * It associates k anchor boxes (ROIs with different scales and ratios) to each spatial location, and estimates an 'objectiveness score' for each. It uses NonMaxSuppression to keep the best boxes.
* **What's the difference with InstanceSegmentation?**
    * OD ultimately tries to found a box surrounding the object and assign a label to that box. IS instead also attempts to assign the set of pixels of that box that actually compose the detected object.
    * It does that by extending the Faster R-CNN with a branch predicting the object <span style="text-decoration:underline;">mask</span>.
* **What are region-free methods?**
    * Methods that attempt OD as a single regression problem, solving all-at-once with a single large CNN (YOLO, SSD).
* **Differences: classification vs OD network. What are the major advantages of OD networks over baselines built upon a CNN for classification? (Consider R-CNN as a reference for OD network)**
* **Describe what are the major changes introduced by Fast R-CNN and Faster R-CNN wrt the baseline R-CNN.**
    * (see above)

<br>

### MetricLearning
* **What is <h-def>Metric Learning</h-def>?**
    * It's a way to dissect the CNN to prevent retraining the whole thing when a new class is added. For example, the first part (feature extraction) is general and can be kept, while the final classifier might have to be retrained. But to do this, the network must be trained to <span style="text-decoration:underline;">measure distances between images</span>.   ... 
* **Briefly describe what <h-def>Siamese Networks</h-def> are and what they are used for.**
    * Two identical networks perform the same operations, using the same weights and architecture, on two different inputs. They're fed with a pair of images which may or may not belong to the same class. To learn, they use a specific type of loss. At inference, when a new img arrives, they compute the features, identify the closest class, and decide whether it belongs to it or it's an unknown class.
    * <span style="text-decoration:underline;">Losses</span>: contrastive loss, triplet loss (minimize distance from positive, maximize from negative)
    * <span style="text-decoration:underline;">Tasks</span>: FaceID, in which you feed saved images into a cnn, get features and then compare it against unseen

<br>

### Autoencoders
* **What relationship we learn in a neural autoencoder? Why do we do it?**
    * An <h-def>AE</h-def> is a neural network used for data reconstruction (unsupervised learning). It simply learns to reconstruct its input, thus approximating the identity function. It's composed of an encoder followed by a decoder, and the layer where they're joined is called latent representation, which is intended to be a simplified (low-dimension) but meaningful representation of the complete input. So, we train the AE to reconstruct the same input passing through this latent representation, and the interesting thing is that, when it's trained, we can use this latent representation for various tasks, eg. we could use the encoder as an input for a classifier (which can now work better given a simplified input), or use the decoder as a generative model starting from random vectors as 'latent representations', or noise reduction, or also word embedding, used in Natural Language Processing tasks.
* **How could we size the embedding of a neural autoencoder?**
    * I would say when we don't care how much information from previous steps we want to save. Since in RNN, we're obliged to use ReLU, we basically accumulate the input data and as a result, our memory should be kinda short. but in LSTM we decide also about the amount of prev info(thanks to gates!) as well as having a long memory

         
<br>

### GANs
* **What are GANs? Briefly describe their training process.**
    * <h-def>GAN</h-def> is a kind of model where two networks are put against each other as adversaries. One network (Generator G) creates fake images starting from a dataset of real images, the other network (Discriminator D) has to determine if the image generated by the Generator is real or fake (i.e. generated).
    * Note that with this kind of training we're basically using an entire network to find the <span style="text-decoration:underline;">loss</span> function.
    * The <span style="text-decoration:underline;">training</span> happens cyclically, first we train G, then D, then G again, and so on. Initially, G is poorly trained and so D detects its images as fake, but the more G trains, the less reliable D will be. At some point, D will be totally unreliable, meaning that G can generate perfectly realistic images, so D will be discarded and we keep G as a great generator.
* **What's the issue when training G?**
    * The main problem is that the function to minimize has very low gradient at the beginning of the training when G is untrained. This is easily fixed by maximizing a transformation of that function, ultimately achieving the same thing, but with the transformation we achieve higher gradients early in learning.

     
