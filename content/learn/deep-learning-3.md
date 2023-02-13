---
title: RNN
description: 'Recurrent Neural Networks (RNN) are a type of neural network designed to process sequences of data, thus they are characterized by memory: they use a recurrent connection to allow information from previous time steps to be used in the processing of the current time step. RNNs can be used for sequential tasks such as language translation, sentiment analysis, and speech recognition.'
topics: []
acronyms: [
    ['FFNN', 'Feedforward NN'],
    ['CNN', 'Convolutional NN'],
    ['RNN', 'Recurrent NN'],
    ['NN', 'Neural Network'],
    ['ML', 'Machine Learning'],
    ['BPTT', 'Backprop through time'],
    ['LSTM', 'Long Short-Term Memory'],
    ['CEC', 'Circular Error Carousel'],
    ['LTR', 'Left to Right'],
    ['RTL', 'Right to Left'],
    ['FC', 'Fully Connected'],
    ['WE', 'Word Embedding'],
    ['NLP', 'Natural Language Processing'],
    ['BOW', 'Bag of Words'],
    ['CBOW', 'Continuous BOW'],
    ['VG', 'Vanishing Gradient'],
    ['EG', 'Exploding Gradient'],
    ['ie', 'that is (id est)'],
    ['eg', 'for example (exempli gratia)'],
    ['wrt', 'with respect to'],
]
color: 'green darken-2'
---

# RNN
Recurrent Neural Networks (RNN) are a type of neural network designed to process sequences of data, thus they're characterized by 'memory': they use a recurrent connection to allow information from previous time steps to be used in the processing of the current time step. RNNs can be used for sequential tasks such as language translation, sentiment analysis, and speech recognition.

<card-disclaimer title="Source" short="Polimi course" course="Artificial Neural Networks and Deep Learning"></card-disclaimer>

<card-disclaimer title="Format" short="Q+A"></card-disclaimer>

<card-disclaimer title="Words and colors" short="Acronyms" :colors="['def','pro','con']"></card-disclaimer>

### Recurrence
* **Do I really need a RNN to process a stream of input data? Why no FNN?**
    * With dynamic data (change in time), the classic approach is to use an AutoRegressive model (AR) that predicts the next input from a combination of previous ones. FFNN are a generalization of AR models, using nonlinear hidden layers, but they don't have any feedback loop like RNN do, so in practice they just work with static datasets (each input gives an output, and there's no relation with other inputs), meaning that you have to decide in advance how much memory the model has.
    * The key difference is that RNNs have memory, an internal state. What is to be learned is how the input should modify the internal state.
* **What is Backprop Through Time in RNNs?**
    * <h-def>BPTT</h-def> is the algorithm that is used in RNNs to perform backprop as it happens in FFNN. With the RNN, we can perform the so-called 'unrolling', meaning that we can replace the recursion loop with another neuron with the previous input in it. In this way, we have the same neuron multiple times (so with same weights), allowing us to rewrite the RNN as a FFNN. In the backprop step, the gradient is updated with the <span style="text-decoration:underline;">avg gradient</span> of all the copies.
    * The unrolling could go on until the beginning of time, or it can also be truncated, so we have to decide in advance the size of the memory for the unrolled RNN. Still, not too much cuz of VG.
* **What kind of applications can be solved with a RNN? Make 2 examples and discuss their characteristics.**
    * In general, RNNs can tackle tasks like translation or voice2text. They both feature input data that are temporally correlated and sequential, which makes us think about exploiting the recurrence relations present in RNNs, rather than other models. Of course not any RNN can succeed in these tasks, it depends on its architecture and parameters as usual, but in general they'll perform better at these tasks than FNN or CNN.
    * Both the examples made are of the many2many type, but this is not necessarily the case to choose a RNN. [See below](#seq2seq).
     
<br>

### LSTM
* **What is an LSTM?**
    * An <h-def>LSTM</h-def> (Long Short-Term Memory) is a type of RNN architecture that is capable of learning long-term dependencies in sequential data. Unlike traditional RNNs, LSTMs have memory cells that can store information for longer periods of time. The idea is to have some gate mechanism where you can write/keep/read the information in the memory cells whenever the corresponding gate is turned on. The gates are based on the [CEC](#vanishing-gradient). Decisions are based on the output of a sigmoid, while the loop is ruled by a ReLU.
    * <span style="text-decoration:underline;">Tasks</span>: natural language processing and other sequential data tasks - speech recognition, time series prediction.
        <v-img src="/learn/deep-learning_rnn_lstm.jpg" width="500"></v-img>
    * Input gate: decide what to write to memory. Write if sigmoid~1
    * Forget gate: decide when to erase memory (erase if ~0)
    * Output gate: nonlinear function (tanh of memory content)
    * ...yes, it's quite hard to grasp. A couple useful links to understand better:
      * [Understanding LSTM](https://colah.github.io/posts/2015-08-Understanding-LSTMs/)
      * [What's happening in my LSTM layer?](https://towardsdatascience.com/whats-happening-in-my-lstm-layer-dd8110ecc52f)
* **When could we prefer the use of RNN nets instead of LSTM nets? why?**
    * They're both well suited for processing sequential data, but:
    <table>
    <tr>
    <td><h-pro><v-icon>mdi-check-circle-outline</v-icon></h-pro></td>
    <td><h-con><v-icon>mdi-close-circle-outline</v-icon></h-con></td>
    </tr>
    <tr>
    <td>
    <span style="text-decoration:underline;">RNNs</span> are simpler and computationally less expensive than LSTMs. They have the ability to process sequential data with a fixed-length window, good for tasks such as language modeling and speech recognition. Relatively simple tasks.
    </td>
    <td>Suffer from VG, hard to train on long-term dependencies
    </td>
    </tr>
    <tr>
    <td><span style="text-decoration:underline;">LSTMs</span> overcome the above limitations by incorporating gates that help control the flow of information through the network. Good for language translation and text generation (needing long memory).
    </td>
    <td>More expensive
    </td>
    </tr>
    </table>

* **Why do we need an attention mechanism? Aren't LSTM enough?**
    * LSTMs are powerful, but may not be enough to fully capture the complexity of the data. An attention mechanism allows the model to focus on specific parts of the input when making predictions, by assigning a weight to each input and creating a weighted sum as the input of the next layer. Moreover, LSTM suffer from [VG problem](#vanishing-gradient), like any recurrence mechanism, so there exist recurrence-free approaches that use only attention, like the [Transformers](#transformers) <v-icon dense>mdi-robot-angry-outline</v-icon>.
* **Why do we need a recurrence mechanism? Isn't the attention mechanism enough?**
    * Recurrent mechanisms, such as RNNs and LSTMs, allow the model to maintain an internal hidden state that can be used to remember information from previous time steps. This hidden state is updated at each time step, allowing the model to maintain a kind of 'memory' of the previous inputs, useful for capturing long-term dependencies. They can be used in conjunction with attention mechanisms to allow the model to both focus on specific parts of the input and also maintain memory of previous inputs.
* **How to initialize the internal state?**
    * An option is the naive init (set to a fixed value eg 0). But it's better to treat it as a parameter to learn, thus initialize it randomly. Then the backprop of the gradient error will do the usual job to update the params.
* **What is a GRU?**
    * <h-def>GRU</h-def> (Gated Recurrent Unit) is a variation of LSTM that combines the forget and input gates into a single 'update gate'. It also merges the cell state and hidden state. It has fewer params than LSTM.
* **What is BiLSTM?**
    * <h-def>Bidirectional LSTM</h-def> is a variation of LSTM where the information flows in both directions, forward (past to future) and backward (future to past). Depending on the task at hand, this could improve the accuracy of the current cell since it has additional information from the future wrt standard LSTM.
    * This is done by using multiple layers of LSTM: one that traverses the sequence LTR, the other RTL. Of course this can't be done online.
    * There can also be multiple stacked layers LSTM: you can build an LSTM on top of another, in the sense that its state will not be based on the inputs, but on the states of the underlying LSTM layer (in addition to the previous cell state, for both). This is like a higher level of abstraction / lower sequence resolution.

<br>

### Vanishing Gradient
* **Classical RNN suffer the VG problem. What is it and what is it due to? Does it only affect RNNs? x3**
    * The <h-def>VG</h-def> problem happens due to the repeated multiplication of numbers with absolute value smaller than 1. This in turn happens in the computation of the gradient with the chain rule. This problem can exist in any sufficiently deep network, even ff, especially if the network uses a S-shaped activation function that can saturate (sigmoid and tanh). RNNs, however, suffer from this problem even more, because backprop through time (<span style="text-decoration:underline;">BPTT</span>) effectively multiplies the depth of the network by the amount of time steps. For this reason, even if properly initialized, they can only learn short sequences (some dozens steps). With bad init, the backprop leads the gradient in layers far from the network output to have value ~0, basically stopping learning, especially of long-term dependencies.
* **Why does <span style="text-decoration:underline;">LSTM</span> help with VG?**
    * LSTM fixes VG by the use of S <span style="text-decoration:underline;">linear activation layer</span> in the hidden node and a <span style="text-decoration:underline;">recursion weight fixed to 1</span> (no issue with VG/EG, and not trainable). Also the linear activation function, having gradient 1, does not shrink the gradient. The only thing to learn is the nonlinear gates, which gradient is <span style="text-decoration:underline;">not affected</span> by the many possible unfoldings of bptt - it's now standard backprop!
    * In detail: the solution is in the <h-def>CEC</h-def> (Circular Error Carousel), a memory cell with a recursion weight fixed to 1. Information is written in the memory cell based on the input and the value of the cell itself through gates. It includes direct access to the forget gate’s activations, enabling the network to encourage desired behavior from the error gradient using frequent gates update at every time step of the learning process.
        <v-img src="/learn/deep-learning_cec.jpg" width="500"></v-img>
    * It is a sort of skip connection: in [U-Net](/learn/deep-learning-2#segmentation)/ResNet, skip is used to let the gradient flow past without reductions, here the CEC lets the gradient flow from any time to any past.
    * [Read more](https://www.codingninjas.com/codestudio/library/solving-the-vanishing-gradient-problem-with-lstm)

<br>

### Seq2Seq
* **What is seq2seq modeling?**
    * <h-def>Seq2seq</h-def> is a type of NN architecture that is used for tasks involving converting a sequence of data into another sequence. It's a supervised learning procedure. At training time, you give the input sequence and the output sequence as a target. At inference time, since there's no target, the output guess is directly fed as input of the next timestep.
    * <span style="text-decoration:underline;">Tasks</span>: natural language processing (translation, speech recognition, summarization, image captioning...)
    * <span style="text-decoration:underline;">Special characters</span>:  `<GO>`/`<SOS>` is the input of the first time step, lets the decoder know when to start generating output. `<EOS>`(end-of-sentence) tells the decoder where the sentence ends. `<PAD>`(padding) is used to pad shorter inputs to the same width of the batch. `<UNK>`(unknown) is used to replace words that appear too rarely (so removed from vocabulary), for much better resource efficiency.
    * [Read more](https://blog.keras.io/a-ten-minute-introduction-to-sequence-to-sequence-learning-in-keras.html)
* **How sentences are embedded in seq2seq modeling?**
    * The <span style="text-decoration:underline;">architecture</span> is encoder+decoder. A RNN layer acts as 'encoder': it encodes the input sequence into a _context vector_ (its own internal state) and returns it (we discard the RNN output!). It is then used by the decoder (another RNN layer) to generate the output sequence. With long sequences, this encoding acts as a bottleneck and it might prevent encoding enough information.
    * <span style="text-decoration:underline;">In more detail</span>: there are batches of coupled sentences, composed by a source and a target sequence. The <span style="text-decoration:underline;">encoder</span> is given the source tokenized (+`<EOS>`). The <span style="text-decoration:underline;">decoder</span> is given the target both as input(`<SOS>`+) and as output(+`<EOS>`). Given the encoding, each timestep takes as input the corresponding element of the target sequence, outputs a guess on which element will be next, and then uses the same target sequence (in a slightly different encoding) to evaluate its guess and learn. If necessary, it will add `<PAD>`and `<UNK>`.
    * Sentences are typically embedded using word embeddings, ie. learned representations of words in a high-dim vector space, where semantically similar words are close to each other in the vector space. To convert a sentence into a vector representation, each word in the sentence is first mapped to its corresponding word embedding, which is then passed to the encoder component of the seq2seq model.
    * There are several ways to combine the word embeddings to produce a fixed-length vector representation of the sentence: sum/avg of word embeddings (simplest), RNN or LSTM (they take the embeddings as input and produce output by updating an internal hidden state at each time step), Transformer-based architectures (these use attention mechanisms to weigh the importance of different words)
* **Describe the LSTM cell and its use in sequence modeling. / Describe the classical seq2seq model based on LSTM cells for language translation, its training procedure, and its run-time inference.**
    * The <span style="text-decoration:underline;">encoder</span> takes in a sentence and processes it word-by-word using an LSTM cell. At each time step, the LSTM cell takes in the current word's embedding, updates its internal hidden state, and produces an output vector. The output vector and the hidden state are passed to the next time step. After processing the entire sequence, the encoder produces the context vector.
    * The <span style="text-decoration:underline;">decoder</span> takes in the context vector and generates a sentence in the target language, one word at a time, using another LSTM cell. At each time step, the cell takes in the previous word's embedding, the context vector, and the previous hidden state, then updates its internal hidden state and produces an output vector, which is then passed to a FC layer with a softmax activation to produce a probability distribution over the vocabulary. The word with the highest probability is chosen as output and passed to the next time step.
    * The <span style="text-decoration:underline;">training</span> involves passing a pair of sentences (in src/target language) to the model, and comparing the predicted output to the actual target. The model's params are updated using backprop and an optimizer to minimize the difference, and a loss function, typically cross-entropy. At inference time, since there's no target, the output guess is directly fed as input of the next timestep.
* **For each of the models, provide its description and make an example of it.**
        <v-img src="/learn/deep-learning_rnnmodels.jpg" width="500"></v-img>
    * One-to-one: translates one input into one output (e.g Image Classification)
    * One-to-many: one input and you want to predict many outputs. (e.g. Captioning)
    * Many-to-one: sequence of input and you want one output (e.g. Text Classification)
    * Many-to-many: (e.g. Translation, Video Classification-Video Captioning)
    * Synced many-to-many: the input and output sequence have the same length (eg translation word-by-word, bad)
    * General Sequence-to-Sequence: enter a sequence, you have a state and the machine is started with this state, and from there it generates a sequence (e.g. Text prediction, Question-Answer)
* **Can seq2seq model be used with RNN or it can only be used with LSTM? Why?**
    * It can be used with both, but LSTM are more commonly used in practice due to their longer memory, allowing for better accuracy in the produced sentences.
* **How is attention used in seq2seq?**
    * Attention was introduced with NTMs but later found an application also in seq2seq. Required for long seqs.
    * Attention on the past hidden states is used as dynamic memory. With the attention mechanism, the context vector is used to draw attention to a particular term of the input, and the combination with it is used to generate more focused contextual information. The whole input is then evaluated by the attention mechanism at each step of the sequence generation, and because of this, it is used as a memory differently from the classic seq2seq model, where it is discarded once the encoding is completed.

<br>

### WordEmbedding
* **What is embedding?**
    * <h-def>Embedding</h-def> is the collective name for a set of language modeling and feature learning techniques in Natural Language Processing (NLP) where words or phrases from the vocabulary are mapped to vectors of real numbers. Conceptually it involves a mathematical embedding from a space with many dimensions per word to a continuous vector space with a much lower dimension.
    * <v-icon>mdi-close-circle-outline</v-icon> The problem with one-hot encoding is that words that are semantically similar will still be orthogonal, the similarity information is not captured. <v-icon>mdi-check-circle-outline</v-icon> The concept of embedding is to place words in some lower-dim (numerical) space where words similar in meaning have a smaller distance.
    * In numbers: usually we work with $\gt 10^6$ words, sparse space. We map it to a dense 100/500-dim space
* **What is <h-def>N-grams</h-def>?**
    * It's another text representation alternative to BOW, that attempts to make a LanguageModel, i.e. telling how a word/sentence/paragraph is likely to happen. Each language has its own distribution, it's not straightforward to convert between models. In a sentence, the probability of the given sentence is the product of the probability of each word given the previous word - but the full language model is not feasible in this way. <span style="text-decoration:underline;">N-grams: assume that a word depends only on the previous N-1 words.</span> So the history is long N.
* **What is Neural Net Language Model?**
    * <h-def>NNML</h-def> is a natural language processing that was done in 2003 without WordEmbedding. The aim was just to predict the current word given a set of words as input. It wanted to overcome the trigram model which only had a small memory of N=2. The important achievement it did was to convert a onehot-encoded word into a vector, using a lookup table. This was basically the invention of WE, but it was only realized 10y later.
* **What is WordEmbedding and what is it used for?**
    * <h-def>WE</h-def> is required to <span style="text-decoration:underline;">convert</span> a sparse, semantic-free, encoding of words (ie one-hot encoding) based on a dictionary index, <span style="text-decoration:underline;">into</span> a dense, semantic-aware, vector format. Basically, converting words to numbers. \
    Thanks to WE, words can be represented in a lower dense embedding space where Euclidean distance can show semantic similarity between words. This semantic distance property can be induced explicitly (eg GLOVE), or implicitly learned in an unsupervised way (eg. word2vec).
    * Under the hood it uses a FFNN (while seq2seq used LSTM).
    * Images or audio spectrograms are dense. The one-hot encoding for words is sparse, so most of info is useless. A <h-def>BOW</h-def> (BagOfWords) is a way of representing the words by their <span style="text-decoration:underline;">frequency</span> of appearance in a text.
* **What is the connection with seq2seq?**
    * Seq2seq modeling uses word embedding to encode the sequences. The embedding used can vary, and it affects heavily the performance of the seq2seq model. So encoding is very important! For example, the performance of chatbots... without making any names
* **Is WordEmbedding a supervised or unsupervised ML task? Why?**
    * The model is <span style="text-decoration:underline;">unsupervised</span>, since we just give the words for training, but we don't provide labels or output. In particular, it's self-supervised.
* **What does the sentence _"You shall know a word by the company it keeps"_ mean? Why did we mention it? Which model uses it? Describe the model / How is WE obtained with the word2vec model? Describe the Word2Vec Continuous Bag of Words model x3**
    * Most models used to implement WE use an AE trained in an <span style="text-decoration:underline;">unsupervised</span> way on a large corpus of text.
    * The most common is the word2vec model, which performs WE using a <h-def>CBOW</h-def> approach. In practice, it predicts a word by using the preceding n/2 and following n/2 words' encoding. <span style="text-decoration:underline;">Input</span> words are encoded via the one-hot encoding, and they're projected into a continuous vector (via a lookup table), and the n vectors obtained this way are averaged. The <span style="text-decoration:underline;">output</span> is framed as a classification problem predicting the one-hot encoding of the target word, the averaged vector is used to predict the output word via softmax. The training is performed using multiclass cross-entropy.
    * The sentence means that a word alone has little to no meaning without context (surrounding words)
    * SkipGram architecture: onehot -> embedding -> set of words (prev and past words wrt onehot input)
    * CBOW architecture (~inverse): set of words -> project them and sum using same embedding -> predict next
    * <h-pro><v-icon>mdi-check-circle-outline</v-icon> Compared to NNML, there's <span style="text-decoration:underline;">no hidden layer</span>, making it much less complex and 1000x faster to train.</h-pro> Another difference is that it also uses future words.
    * <span style="text-decoration:underline;">Applications</span>: info retrieval, doc classification/similarity, capture semantic of text: sentiment analysis
* **Why Word2Vec represents an efficient and effective way to encode words?**
    *  One-hot encoding: <v-icon>mdi-close-circle-outline</v-icon> embeds words in high-dim space where words are orthogonal. Fitting a language model in this space has to face the curse of dimensionality (huge space but mostly empty).
    * WE: <h-pro><v-icon>mdi-check-circle-outline</v-icon> compresses the text representation</h-pro> in such a way that the embedding space has <h-pro>reduced dimensionality</h-pro> and words which are close in space share similar meaning (<h-pro>semantic similarity</h-pro>). The space is 'converted' sparse to dense, discrete to continuous. Also,<h-pro><v-icon>mdi-check-circle-outline</v-icon> vector operations are supported</h-pro> and make 'intuitive sense' (eg. king-man+woman = queen)
* **How is the WordEmbedding loss function defined?**
* **Text encoding problems and solution?**
* **Describe the LSTM cell and the architectures which can be used when inference is done online (ie. one word at a time) and batch (ie when the entire cell is available)**
* **Can WordEmbedding overfit? Motivate + suggest a way to detect it (in case it does) x2**
    * Like other ML models, also WE is subject to overfitting. It can overfit when the model is trained on a small dataset that does not sufficiently represent the underlying distribution of the data. Especially is using one-hot encoding, which means having many parameters, there's more possibility of overfit.

<br>

### Neural Turing Machines
* **What is <h-def>NTM</h-def>?**
  * This model describes the functioning of a Neural Turing Machine from a high level perspective.
        <v-img src="/learn/deep-learning_ntm.jpg" width="500"></v-img>
* **How does a NTM work?**
    * NTM are models derived from Turing Machines that combine a traditional FFNN with a memory component, which allows the NTM to store and retrieve information (like RAM in ur pc).
    * In detail, NTMs have 2 main components: the <span style="text-decoration:underline;">controller</span> (FFNN that takes input and produces a set of read and write weights, which determine which parts of the memory matrix the NTM should read from and write to), and the <span style="text-decoration:underline;">memory matrix</span> (2D array to store data).
    * <span style="text-decoration:underline;">Tasks</span>: language modeling, image captioning, question answering, seq predicting... (normally hard for ffnn)
* **How does the READ mechanism work in a NTM?**
    * _The controller produces a set of read weights, which are used to read from the memory matrix_. \
    The read weights are used to create a <span style="text-decoration:underline;">weighted sum of the memory matrix</span>, which is then passed through the controller as input.
* **How does the WRITE mechanism work in a NTM?**
    * _The controller produces a set of write weights, which are used to write to the memory matrix_. \
    The write weights are used to determine the <span style="text-decoration:underline;">location</span> in the mem matrix to update and the <span style="text-decoration:underline;">values</span> to write.
* **What's the main issue to implement NTM?**
    * It's that we have to make read/write operations differentiable in order to perform learning.
    * The solution is attention.
* **What is an attention mechanism? How is attention used in NTMs?**
    * <h-def>Attention</h-def> is a way of focusing more on something (eg some parts of a sequence) but without ignoring the rest (like a softmax). This is important in NTMs since it's a way to make read/write operations differentiable, a property necessary to learn. With attention, at each step we read and write everywhere, but to different extents! Meaning we put attention to some memories more than others. It's like selecting, in a <span style="text-decoration:underline;">soft</span> way, which cell to read from.
    * There are two <span style="text-decoration:underline;">types</span> of attention:
        * <span style="text-decoration:underline;">Content-based attention</span>: [find by content] searches memory and match what they’re looking for
        * <span style="text-decoration:underline;">Location-based attention</span>: [find by address] allows relative movement in memory
    * In the case of NTMs, the attention mechanism is used to compute weights for each location in the memory matrix. Each weight indicates the importance of each location for the current task. Then, a weighted sum of the memory matrix is computed and used as input for the controller. It can be particularly useful to focus on specific parts of the memory matrix, especially with a very large matrix.
    * The read and write heads could also be considered a sort of attention mechanism. The read heads can be seen as a form of selective attention to specific parts of the memory matrix. Same for write heads for writing.
* **What's the difference with LSTM?**
    * In LSTMs the memory is accessed through gates, so we don't write directly to it. in NTMs we have a real external memory that we can write on. It's like each cell has its own CEC.
      
<br>

### Transformers
* **What is it?** <v-icon>mdi-robot-angry-outline</v-icon>
    * The <h-def>Transformer</h-def> is ~~a cool robot~~ a model that improves the performance of RNN or LSTM using attention. It uses exclusively attention building blocks, and no recurrence, thus is not affected by vanishing nor exploding gradient. It's the current state-of-the-art in text modeling and prediction.
        <v-img src="/learn/deep-learning_transformers.jpg" width="500"></v-img>
* **How does the transformer model work?**
    * The transformer utilizes residual learning both in encoder and the decoder, which together with ReLU activation and attention, make it resilient to vanishing gradient. Of course, residual learning affects the gradient flow through the network since it allows the gradient at the output of a residual block to directly contribute to the gradient at any layer below it, since each of those layers adds something to the output.
    * It's composed of a stack of encoders and a stack of decoders built this way. The <span style="text-decoration:underline;">encoder</span> has a self-attention layer that puts attention on all input data, and a FFNN that gets the self-attention output as its input. The <span style="text-decoration:underline;">decoder</span> also has a self-attention and FFNN, but also has a encoder-decoder attention that puts attention on encoder data.
* **Is it implemented with a RNN?**
    * It differs from other seq2seq models since it is <span style="text-decoration:underline;">not</span> implemented with RNNs: the attention mechanism allows it to elaborate the entire input sequence in parallel. However, it is worth noting that at test time it does perform a sort of recurrence on the output, since it uses the outputs at the previous steps to produce the next output.
* **Does it suffer the VG problem? Exploding?**
    * None, since the Transfomer does not exploit recurrence. Instead, it uses exclusively attention building blocks.
    * (The attention mechanism to weigh the importance of different parts of the input, and the self-attention mechanism to weigh the importance of difference positions in the input. This architecture allows the model to handle long-term dependencies in the data effectively, without the need for recurrence and the risk of VG)