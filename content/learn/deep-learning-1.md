---
title: FFNN
description: 'Feedforward Neural Networks (FFNN), also known as Multi-layer Perceptrons (MLPs), are the simplest type of neural networks. They consist of an input layer, some hidden layers, and an output layer, and the information flows only in one direction from the input layer to the output layer. FFNNs are widely used for tasks such as regression and classification.'
topics: []
acronyms: [
    ['FFNN', 'Feedforward NN'],
    ['CNN', 'Convolutional NN'],
    ['RNN', 'Recurrent NN'],
    ['NN', 'Neural Network'],
    ['PCA', 'Principal Component Analysis'],
    ['ML', 'Machine Learning'],
    ['DL', 'Deep Learning'],
    ['GAN', 'Generative Adversarial Network'],
    ['GD', 'Gradient Descent'],
    ['SGD', 'Stochastic GD'],
    ['ES', 'Early Stopping'],
    ['LR', 'Learning Rate'],
    ['VG', 'Vanishing Gradient'],
    ['EG', 'Exploding Gradient'],
    ['CV', 'Cross-Validation'],
    ['HP', 'Hyperparameter'],
    ['MSE', 'Mean Squared Error'],
    ['ie', 'that is (id est)'],
    ['eg', 'for example (exempli gratia)'],
    ['wrt', 'with respect to'],
]
color: 'green darken-1'
---

# FFNN
Feedforward Neural Networks (FFNN), also known as Multi-layer Perceptrons (MLPs), are the simplest type of neural networks. They consist of an input layer, some hidden layers, and an output layer, and the information flows only in one direction from the input layer to the output layer. FFNNs are widely used for tasks such as regression and classification.

<card-disclaimer title="Source" short="Polimi course" course="Artificial Neural Networks and Deep Learning"></card-disclaimer>

<card-disclaimer title="Format" short="Q+A"></card-disclaimer>

<card-disclaimer title="Words and colors" short="Acronyms" :colors="['def','pro','con']"></card-disclaimer>

## LEARNING
* **What is Hebbian Learning?**
    * It's a learning method that starts from random weights that gets modified iteratively by adding some quantity at each step. This quantity is `learningrate*inputk*desiredoutput`. The weights are fixed one sample at a time (online) and only if the prediction is wrong. It implements SGD.
    * Ultimately, Hebbian rule is minimizing the distance of misclassified points from the decision boundary.
* **Difference: supervised/unsupervised learning**
* **Example: NN used for supervised learning (problem + model + loss used)**
* **Example: NN used for unsupervised learning (problem + model + loss used)**
* **Example: application of classical <span style="text-decoration:underline;">supervised</span> learning, then present its deep counterpart**
    * Supervised: image classification, ...
* **Example: application of classical <span style="text-decoration:underline;">unsupervised</span> learning, then present its deep counterpart**
    * We say PCA as the unsupervised learning technique in ML, and AutoEncoders as the counterpart in DL
    * Unsupervised networks: autoencoder / GAN to generate faces / a deep NN that retrieves from a db of faces the most similar face to the given one
* **What is backpropagation and how does it work?**
    * <h-def>Backprop</h-def> is a training algorithm used to train NNs. It improves the output of a NN iteratively. In a NN, the information given by the input propagates layer by layer to the output. Backprop uses chain rule to improve the output by propagating the error backwards, from output to input, and calculate the gradient of the error function wrt the weights.
    * In the 'forward pass' we compute all the derivatives, while in the 'backward pass' we use them to modify and optimize the weights. In <span style="text-decoration:underline;">batch</span> approach, multiple forward passes can be computed in parallel, then compute the average and use it for the backward pass.
    * MaximumLikelihood is the criterion used to select the best parameter. Backprop is the algo to maximize that criterion.
* **What is SGD?**
    * <h-def>GD</h-def> in general is an algorithm used to find max/min of a multivariable function. It is used to find the optimal weights of a NN while training, minimizing some loss function. The weight of a neuron is updated starting from its previous weight, with the addition of the current gradient multiplied by some factor.
    * <h-def>SGD</h-def> is a variation of GD - its stochastic approximation. It replaces the actual gradient with its approximation, when the cost function is in form of a sum.
* **What is momentum in training?**
    * Momentum is a way of avoiding local minima and speed up training. It's an additional term in the formula to compute the weights, which, in addition to the current gradient, it also includes the gradient of the previous step, multiplied by a 'momentum factor' to be tuned.
    * NesterovAcceleratedGradient is an additional variation that makes a big jump as momentum and then adjust

<br>

### Deep Learning
* **Why DL?**
* **Difference between DL and other ML paradigms like un/supervised/~~reinforcement~~**
    * Any program that can improve its performance in a task T wrt a metric M given experience E can be said to perform "ML". <span style="text-decoration:underline;"><h-def>DL</h-def> is a class of algorithms that perform ML</span>. In particular, DL algos are based on deep NNs. <span style="text-decoration:underline;"><h-def>NNs</h-def></span> in general are structures that perform a series of differentiable vector operations on an input tensor to produce an output tensor.
* **Discuss how and if DL differs in regard to the overfitting issue**
    * w deep must be wary cos too many parameters can overfit
* **Does DL work only for images and text? Motivate.**
    * No, it can work with different types of data. The core reason behind this is that a DL model is not aware of the meaning behind the data that is fed into it. DL models work on tensors, and simply try to find patterns hidden inside those tensors, so any data that can be meaningfully represented as a tensor should in principle be viable for DL.

<br>

### Features
* **Is data representation (features) learned via DL always better than hand-crafted features? Why?**
    * It is not always better. The choice depends on the specific task, dataset, and the resources available.
    * <span style="text-decoration:underline;">Hand-crafted features</span> are based on domain knowledge and expert understanding of the problem. They are often designed to capture specific, task-relevant information and can be very effective in certain situations. For example, in image classification, hand-crafted features like SIFT and HOG are still widely used and perform well in many cases.
    * On the other hand, <span style="text-decoration:underline;">DL models</span>, especially deep CNNs and transformers, have the ability to learn useful features from data automatically. These models can learn complex, abstract representations of data that are not easily captured by hand-crafted features. They are particularly useful for tasks with large amounts of data and when the data is noisy or has a lot of variations.
    * In general, it's worth trying both approaches and comparing the results, and choose the one that performs best for the specific task. In some cases, it's also possible to combine both hand-crafted features and deep-learned features, to leverage the strengths of both approaches and improve the performance of the model.

<br>

## TRAINING
* **Differences: training FFNN for regression vs for classification**
    * The major differences are in the output of the network, specifically the activation function of the output layer and the loss function. This is because, for the inner workings of a network, it's been verified that the same general architecture can work well with both tasks. Of course, the output must encode the information about a class in the case of classification, and a real number in case of regression.
    * If the task is <span style="text-decoration:underline;">classification</span>, the activation of the output layer is either sigmoid with binary/multilabel classification, or softmax with classification over multiple mutually exclusive classes. Loss function is usually crossentropy.
    * If the task is <span style="text-decoration:underline;">regression</span>, the activation of the output layer is linear.

<br>

### Regularization
* **What is regularization and why do we need it in training?**
* **List and discuss briefly the available options.**
* **Describe 2 regularization techniques used in training NN providing their rationale/motivation, what they do and why they do that.**

<br>

### Overfitting
* **What is overfitting? What is it due to?**
    * <h-def>Overfitting</h-def> is the divergence of test error from training error, which is mainly considered to be due to the learning algorithm detecting patterns that are too specific to the training dataset, thus it's unable to generalize since those pattern won't be found in unseen data.
    * The propensity to overfit is often correlated to the amount of parameters in a ML algo, since with many parameters it might be possible to fit the training set exactly, which would be undesirable since that would mean fitting the noise in the training data too. Classical ML algos usually have less params, which makes them less prone to overfit but also more prone to <h-def>underfit</h-def>, thus potentially impair generalization abilities. Underfitting happens when a model is unable to learn a task, even on the training data. So, like everything in life, the number of parameters to be used is a tradeoff.
* **How do you avoid overfitting when training Deep NNs? / List and discuss briefly 3 techniques.**
* **What is EarlyStopping // Dropout // WeightDecay and why does it help with overfitting?**
    * Overfitting in practice is when, during training, the training error keeps decreasing but the test error plateaus or even starts increasing. The simplest technique to tackle this is <span style="text-decoration:underline;"><h-def>EarlyStopping</h-def></span> (ES), in which we stop training the network when we see that the test error has stopped improving for some number of iterations.
    * <span style="text-decoration:underline;"><h-def>Dropout</h-def></span> is a technique in which we randomly _'turn off'_ some neurons in a layer at training time, with the aim of reducing codependency between neurons, thus possibly increasing the ability to learn more generalized features. This implicitly creates an ensemble of weaker models, on different minibatches, and at test time we're evaluating their average.
    * <span style="text-decoration:underline;">WeightDecay</span> (see below)
    * <span style="text-decoration:underline;">Batch normalization</span> (see below)
    * <span style="text-decoration:underline;">L1/L2 regularization</span>(<span style="text-decoration:underline;">WeightInit</span>) (see below) / XavierInit could be considered as mitigating overfitting: by not initializing with big values, you prevent forcing the network from following some specific paths, which could be poor local minima
    * these do <span style="text-decoration:underline;">not</span> help overfitting: ReLU / sgd

<br>

### Batch Normalization
* **What is <h-def>BatchNormalization</h-def>?**
    * It's a way of performing preprocessing at a layer inside the network by whitening inputs, i.e. standardizing mean and covariance at a layer. It's been shown to improve gradient flow, allows higher LR (faster learning), reduces the dependence on WeightInit.
    * It has 4 params in total: 2 trainable (gamma,beta) and 2 nontrainable (mean,std of the batch that arrives).

<br>

### Weight Initialization
* **What is <h-def>WeightInit</h-def>?** 
    * It considers a prior on the distribution of the weights, and maximize the likelihood of the output given the weights and the prior on what distribution they're expected to follow. In practice, this amounts to a simple modification of the loss function that takes into account how big the weights are. It helps with VG and leads to faster convergence and more stability. 
* **What are its problems and solutions?** 
    * An improper initialization can cause VG/EG issues in deep networks. Too naive inits (eg all zeros) can also prevent gradient descent to happen. Because of this, weights should be initialized in order not to increase nor decrease the magnitude of the gradients on average. So the common inits (Glorot/Xavier, He) keep a unitary average magnitude of gradient, by sampling from various Gaussian distributions.  
* **How does it help with VG?**  
    * It helps with the VG problem by initializing the weights with small random values that are chosen from a distribution with a specific variance, which helps to ensure that the gradients are not too small, allowing the network to learn more effectively.  
* **List and discuss briefly the available options**
    * In general we use Glorot==<span style="text-decoration:underline;">Xavier</span> initialization. This technique takes into account the amount of neurons in both input and output. It's best used with tanh/softmax/linear/logistic activations. The idea is that if we have many inputs, then the variance of the value that enters an output neuron will become higher, and viceversa if we have few inputs. $w \sim N(0,  \frac{2}{n_{in}+n_{out}})$
    * There is also <span style="text-decoration:underline;">He</span> initialization, which variance is based on only the amount of neurons in input of the layer. It's best used with ReLU. $w \sim N(0, \frac{2}{n_{in}})$

<br>

### Weight Decay
* **What is <h-def>WeightDecay</h-def>?**  
    * Weight Decay, or L2 Regularization, is a regularization technique applied to the weights of a neural network. We minimize a loss function compromising both the primary loss function and a penalty on the L2 Norm of the weights: $L_{new} (w)=L_{original}(w) + \lambda w^T w$  where $\lambda$ is a value determining the strength of the penalty (encouraging smaller weights).
* **When would you prefer WeightDecay instead of EarlyStopping?** 
    * When training is slow to converge (so ES would stop prematurely). Also, when you're working with a small dataset and you can't split the validation set: ES require more validation data than wdecay.
    * ES is better when weights are not an issue... ie maybe never lol or if many many data  
* **What is gamma param and how to tune it? x2**
    * The gamma parameter in WeightDecay defines how much the regularization will weigh in the loss function. The higher it is, the more it will shrink the weights. If it's too high, it will overcome the gradient and just force down the weights without much of a rationale. If it's too low, the regularization will be too weak.
    * As most HPs, the best way to tune it is via crossvalidation (CV). In general it's best to start with small values, the gradually increase it by one order of magnitude if it works well, or decrease if it does not. As usual, split the data in training+validation sets, minimize for different gammas, and choose best.
     
<br>

### Vanishing Gradient
* **What is it and what is it due to?**
    * VG is caused by the <span style="text-decoration:underline;">multiplication</span> of gradients with less than unitary norm in <span style="text-decoration:underline;">deep</span> networks.
    * Main causes (to check if happens): depth, activation functions, presence of RecurrentLayers, WeightInit, WeightDistr during training, avg GradientNorm during training
* **Can the choice of the <span style="text-decoration:underline;">ActivationFunctions</span> help with the VG issue?**
    * yes, [relu](#activationfunctions)
* **Can the choice of the <span style="text-decoration:underline;">WeightInit</span> help? Why?**
    * yes, see [above](#weight-initialization)
* **Can the use of Dropout help? Why?**
    * No, dropout is used to prevent overfitting, VG won't be solved by turning off some neurons
* **Can TransferLearning help? Why?**
    * I'd say yes, since if we're importing parts of a network, that network is expected to be well trained and thus not affected by VG. But, if we're keeping only a small part of the trained network and attaching many untrained layers, VG could still happen.

<br>

### Learning Rate
* **What is LR and how would you choose its value?**
    * <h-def>LR</h-def> is a parameter related to NN training process. The GD approach, used to train a NN, updates the weights based on a fraction of the gradient of the error function wrt the weight. This 'fraction' is regulated by the learning rate, which is a number in `(0,1)`.
    * LR has to be chosen carefully. Too small values will lead to a painfully slow training, and too big values might lead to oscillations during training, compromising training stability. The best value can be chosen via hp tuning.
* **Adaptive LR?**
    * Neurons in each layer learn differently: varying gradient magnitudes, VG in early layers... There are several algos proposed that have adaptive LR, such as RMSprop and Adam.
* **What would you do to fasten training?**
    * I would implement BatchNormalization in order to allow for a higher LR to be used. Also WeightInit helps.
* **Does LR have some relationship with the dying neurons issue? Why?**
    * The dying neuron problem happens with ReLU activation functions when the neuron activation value becomes negative, the neuron output becomes zero and the neuron becomes inactive. As the gradient in the negative region is zero, neurons in this condition do not change at all. A LR too high might inadvertently switch off a ReLU neuron in the learning process, prematurely impacting the real capacity of the network. Because of this, it's preferable to use relatively small LR with ReLUs.
* <v-icon>mdi-check</v-icon> **True**: A low LR does not compromise training / high might compromise / LR should be reduced while training
* <v-icon>mdi-close</v-icon> **False**: The higher the LR the better the training

<br>

### ActivationFunctions
* **Discuss pro/cons of sigmoid, hyperbolic tangent, ReLU. When to use each? Why? Provide their derivatives.**
    * The <span style="text-decoration:underline;">sigmoid</span> activation function was the first one to be used with neural networks. It seems convenient, since <h-pro><v-icon>mdi-check-circle-outline</v-icon> it's continuously differentiable at any point, it's monotonic, and has a limited output range</h-pro>. However, <h-con><v-icon>mdi-close-circle-outline</v-icon> it saturates on most of its domain (for most of the inputs it's flat, so its gradient is basically zero), which causes the serious drawback of the VG, halting the learning, especially with deep networks.</h-con>
    * An alternative is the <span style="text-decoration:underline;">tanh</span>, which is similar in shape and behaviour, but with the key difference that <h-pro><v-icon>mdi-check-circle-outline</v-icon> it's vertically centered at 0, thus resembling the identity function more closely and so the trained model will more easily behave like a linear model</h-pro>. <h-con><v-icon>mdi-close-circle-outline</v-icon> It saturates (at -1 or +1) too</h-con>, but in general its nonlinearity behaviour is always preferred to that of the sigmoid. Both can be used in the output layer for 0/1 coding or -1/+1 coding respectively, but should in general be avoided in hidden layers unless the network is shallow.
    * The <span style="text-decoration:underline;">ReLU</span> is nowadays the most used activation function. <h-pro><v-icon>mdi-check-circle-outline</v-icon> It has faster SGD convergence and efficient gradient propagation (up to 6x faster training). It doesn't suffer from the VG/EG problem thanks to its unitary gradient</h-pro>. <h-con><v-icon>mdi-close-circle-outline</v-icon> On the contrary, its output is [0,+inf) so it could blow up the activation. Another major drawback is that, since on the left domain its output is zero, some neurons can ultimately stop responding and become 'dead' since the weights won't get adjusted during descent.</h-con> This in turn speeds up training since we're ultimately left with less neurons, like a permanent dropout :) but i mean its still bad
    * Some alternatives include <span style="text-decoration:underline;">Leaky ReLU</span> or <span style="text-decoration:underline;">ELU</span> that allow a small positive gradient on the left domain to prevent dead neurons.
* **List and discuss briefly the available options for output activation functions**
    * For regression, the common choice is to use a <span style="text-decoration:underline;">linear</span> activation. (never to be used in hidden layers, useless). Also a <span style="text-decoration:underline;">ReLU</span> can be used it the regression problem is strictly positive (same).
    * For classification, the most popular choice is the <span style="text-decoration:underline;">softmax</span> activation function, which transforms the raw outputs of the neural network into a prob distribution over the input classes (that sums to 1). A <span style="text-decoration:underline;">sigmoid</span> can be used too (0/1 encoding) or also <span style="text-decoration:underline;">tanh</span> (-1/+1 encoding), but only if the classes are not mutually exclusive - eg a network to detect multiple objects in an image.

<br>

### Loss Functions
* **List and discuss briefly the available options**
    * It depends on architecture and problem you're solving. <span style="text-decoration:underline;">MSE</span> is used for regression (predict a continuous numerical value). <span style="text-decoration:underline;">Categorical Cross-entropy</span> is used for classification. <span style="text-decoration:underline;">MinMax</span> is used in generative models, and measures the min and max differences between generated/training data. <span style="text-decoration:underline;">Triplet</span> is used in metric learning (see CNN). <span style="text-decoration:underline;">IoU</span> (Intersection over Union) is used for Image Segmentation problems, and it measures the overlap between predicted/true segmentation.
* **What is binary crossentropy?**
    * Binary cross-entropy is a loss function that is commonly used in ML, particularly in supervised learning problems where the goal is to classify an example as belonging to one of two classes. It is used to measure the dissimilarity between the predicted probability distribution and the true probability distribution. The true probability distribution is represented by a vector where each element corresponds to a class and has a value of 1 if the example belongs to that class and 0 otherwise. The predicted probability distribution is represented by a vector of predicted probabilities for each class.
    * The binary cross-entropy loss function is defined as $loss(y, \hat{y}) = −(y \log(\hat{y}) + (1−y) \log(1− \hat{y}))$, where $y$ is the true probability distribution and $\hat{y}$ is the predicted probability distribution.
    * Tasks: binary classification problems, such as image classification problems where the goal is to classify an image as either containing a certain object or not.